"use client";

import { useEffect, useMemo, useState } from "react";

const HEARTBEAT_INTERVAL_MS = 15000;

const getVisitorId = () => {
  const storageKey = "live-visitor-id";
  const existingId = sessionStorage.getItem(storageKey);

  if (existingId) {
    return existingId;
  }

  const newId = crypto.randomUUID();
  sessionStorage.setItem(storageKey, newId);
  return newId;
};

export const LiveVisitors = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const visitorId = useMemo(() => getVisitorId(), []);

  useEffect(() => {
    const eventSource = new EventSource(`/api/live-visitors?visitorId=${visitorId}`);

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as { count?: number };
        if (typeof payload.count === "number") {
          setVisitorCount(payload.count);
        }
      } catch {
        // noop: ignore malformed messages
      }
    };

    const sendHeartbeat = () => {
      void fetch("/api/live-visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitorId }),
      });
    };

    sendHeartbeat();
    const intervalId = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      eventSource.close();

      void fetch(`/api/live-visitors?visitorId=${visitorId}`, {
        method: "DELETE",
      });
    };
  }, [visitorId]);

  if (visitorCount === null) {
    return <>Live visitors: --</>;
  }

  return <>Live visitors: {visitorCount}</>;
};
