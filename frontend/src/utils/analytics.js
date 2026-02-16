import { apiFetch } from "../query/client";

const STORAGE_KEY_SESSION = "lms_analytics_session";
const STORAGE_KEY_FINGERPRINT = "lms_analytics_fp";
const FLUSH_INTERVAL_MS = 8000;
const MAX_QUEUE = 50;

let queue = [];
let flushTimer = null;
let deviceInfo = null;

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

export function getSessionId() {
  let id = sessionStorage.getItem(STORAGE_KEY_SESSION);
  if (!id) {
    id = "s_" + Date.now() + "_" + Math.random().toString(36).slice(2, 11);
    sessionStorage.setItem(STORAGE_KEY_SESSION, id);
  }
  return id;
}

export function getFingerprint() {
  let fp = sessionStorage.getItem(STORAGE_KEY_FINGERPRINT);
  if (!fp && typeof navigator !== "undefined") {
    const str = [
      navigator.userAgent,
      navigator.language,
      (navigator.languages && navigator.languages[0]) || "",
      screen.width,
      screen.height,
      new Date().getTimezoneOffset(),
      navigator.platform || "",
      navigator.hardwareConcurrency || 0,
    ].join("|");
    fp = simpleHash(str);
    sessionStorage.setItem(STORAGE_KEY_FINGERPRINT, fp);
  }
  return fp || "";
}

export function getDeviceInfo() {
  if (deviceInfo) return deviceInfo;
  if (typeof navigator === "undefined" || typeof screen === "undefined") return {};
  deviceInfo = {
    userAgent: navigator.userAgent,
    screenWidth: screen.width,
    screenHeight: screen.height,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || String(new Date().getTimezoneOffset()),
    platform: navigator.platform || "",
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
  };
  return deviceInfo;
}

export function track(type, page = "", payload = {}) {
  queue.push({ type, page, payload });
  if (queue.length >= MAX_QUEUE) flush();
}

export function flush() {
  if (queue.length === 0) return;
  const events = queue.slice();
  queue = [];
  const sessionId = getSessionId();
  const fingerprint = getFingerprint();
  const info = getDeviceInfo();
  apiFetch("/api/analytics/events", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      fingerprint,
      deviceInfo: info,
      events: events,
    }),
  }).catch(() => {});
}

function scheduleFlush() {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flush();
    flushTimer = null;
  }, FLUSH_INTERVAL_MS);
}

export function trackPageView(path, fromPath = "") {
  track("page_view", path, { fromPath, path });
  scheduleFlush();
}

export function trackMousePath(page, points) {
  if (!points || points.length === 0) return;
  track("mouse_path", page, { points });
  scheduleFlush();
}

export function trackClick(page, payload = {}) {
  track("click", page, payload);
  scheduleFlush();
}

if (typeof window !== "undefined") {
  const base = import.meta.env.VITE_API_URL || "";
  window.addEventListener("beforeunload", () => {
    if (queue.length > 0 && navigator.sendBeacon) {
      const body = JSON.stringify({
        sessionId: getSessionId(),
        fingerprint: getFingerprint(),
        deviceInfo: getDeviceInfo(),
        events: queue,
      });
      navigator.sendBeacon(base + "/api/analytics/events", new Blob([body], { type: "application/json" }));
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}
