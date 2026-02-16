import { useEffect, useRef, useCallback } from "react";
import { trackMousePath } from "../utils/analytics";

const THROTTLE_MS = 200;
const MAX_POINTS = 80;
const FLUSH_INTERVAL_MS = 5000;

export function useMouseTracking(enabled, page = "/") {
  const pointsRef = useRef([]);
  const lastRef = useRef(0);
  const flushIntervalRef = useRef(null);

  const flush = useCallback(() => {
    if (pointsRef.current.length === 0) return;
    trackMousePath(page, pointsRef.current.slice());
    pointsRef.current = [];
  }, [page]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const onMove = (e) => {
      const now = Date.now();
      if (now - lastRef.current < THROTTLE_MS) return;
      lastRef.current = now;
      pointsRef.current.push([e.clientX, e.clientY, now]);
      if (pointsRef.current.length >= MAX_POINTS) {
        flush();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    flushIntervalRef.current = setInterval(flush, FLUSH_INTERVAL_MS);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (flushIntervalRef.current) clearInterval(flushIntervalRef.current);
      flush();
    };
  }, [enabled, flush]);
}
