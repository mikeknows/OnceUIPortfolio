import { NextRequest, NextResponse } from "next/server";

type LiveVisitorStore = {
  visitors: Map<string, number>;
  listeners: Set<ReadableStreamDefaultController<string>>;
  cleanupId: NodeJS.Timeout | null;
};

declare global {
  // eslint-disable-next-line no-var
  var liveVisitorStore: LiveVisitorStore | undefined;
}

const STALE_VISITOR_MS = 30000;

const getStore = (): LiveVisitorStore => {
  if (!globalThis.liveVisitorStore) {
    globalThis.liveVisitorStore = {
      visitors: new Map(),
      listeners: new Set(),
      cleanupId: null,
    };
  }

  const store = globalThis.liveVisitorStore;

  if (!store.cleanupId) {
    store.cleanupId = setInterval(() => {
      const now = Date.now();
      let changed = false;

      for (const [visitorId, lastSeen] of store.visitors.entries()) {
        if (now - lastSeen > STALE_VISITOR_MS) {
          store.visitors.delete(visitorId);
          changed = true;
        }
      }

      if (changed) {
        broadcastCount(store);
      }
    }, 5000);
  }

  return store;
};

const sendSse = (controller: ReadableStreamDefaultController<string>, count: number) => {
  controller.enqueue(`data: ${JSON.stringify({ count })}\n\n`);
};

const broadcastCount = (store: LiveVisitorStore) => {
  const count = store.visitors.size;

  for (const listener of store.listeners) {
    try {
      sendSse(listener, count);
    } catch {
      store.listeners.delete(listener);
    }
  }
};

const updateVisitor = (store: LiveVisitorStore, visitorId: string) => {
  store.visitors.set(visitorId, Date.now());
  broadcastCount(store);
};

const removeVisitor = (store: LiveVisitorStore, visitorId: string) => {
  const removed = store.visitors.delete(visitorId);

  if (removed) {
    broadcastCount(store);
  }
};

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const visitorId = request.nextUrl.searchParams.get("visitorId");

  if (!visitorId) {
    return NextResponse.json({ error: "visitorId is required" }, { status: 400 });
  }

  const store = getStore();
  updateVisitor(store, visitorId);

  const stream = new ReadableStream<string>({
    start(controller) {
      store.listeners.add(controller);
      sendSse(controller, store.visitors.size);
    },
    cancel() {
      removeVisitor(store, visitorId);
    },
  });

  request.signal.addEventListener("abort", () => {
    removeVisitor(store, visitorId);
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { visitorId?: string };

  if (!body.visitorId) {
    return NextResponse.json({ error: "visitorId is required" }, { status: 400 });
  }

  const store = getStore();
  updateVisitor(store, body.visitorId);

  return NextResponse.json({ count: store.visitors.size });
}

export async function DELETE(request: NextRequest) {
  const visitorId = request.nextUrl.searchParams.get("visitorId");

  if (!visitorId) {
    return NextResponse.json({ error: "visitorId is required" }, { status: 400 });
  }

  const store = getStore();
  removeVisitor(store, visitorId);

  return NextResponse.json({ count: store.visitors.size });
}
