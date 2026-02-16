import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/analytics";

export default function AnalyticsTracker() {
  const location = useLocation();
  const previousPathRef = useRef("");

  useEffect(() => {
    const path = location.pathname || "/";
    const fromPath = previousPathRef.current;
    previousPathRef.current = path;
    trackPageView(path, fromPath);
  }, [location.pathname]);

  return null;
}
