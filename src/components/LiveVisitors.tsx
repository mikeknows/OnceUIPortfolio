"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./LiveVisitors.module.scss";

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
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [countAnimationKey, setCountAnimationKey] = useState(0);
  const lastCount = useRef<number | null>(null);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  useEffect(() => {
    if (visitorCount !== null && lastCount.current !== null && visitorCount !== lastCount.current) {
      setCountAnimationKey((current) => current + 1);
    }

    lastCount.current = visitorCount;
  }, [visitorCount]);

  useEffect(() => {
    if (!visitorId) {
      return;
    }

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

  return (
    <div className={styles.liveVisitors} aria-live="polite" aria-atomic="true">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>Live visits</span>
      <span key={countAnimationKey} className={`${styles.count} ${styles.countPulse}`}>
        {visitorCount ?? "--"}
      </span>
    </div>
  );
};
