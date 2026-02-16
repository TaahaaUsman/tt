import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { MdStop, MdPause, MdPlayArrow, MdClose } from "react-icons/md";
import { apiFetch } from "../query/client";

function parseHtmlToChunks(html) {
  if (!html || typeof html !== "string") return [];
  const div = document.createElement("div");
  div.innerHTML = html;
  const nodes = div.querySelectorAll("p, h1, h2, h3, h4, h5, li");
  return Array.from(nodes).map((el) => ({
    text: (el.textContent || "").trim().replace(/\s+/g, " "),
    html: el.outerHTML,
  })).filter((c) => c.text.length > 0);
}

export default function Notes() {
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [playVoice, setPlayVoice] = useState(null);
  const [courseCode, setCourseCode] = useState("cs609");
  const [chunks, setChunks] = useState([]);
  const [activeChunkIndex, setActiveChunkIndex] = useState(-1);
  const [playStatus, setPlayStatus] = useState("idle");
  const [readCompleteNotification, setReadCompleteNotification] = useState(null);
  const chunkRefs = useRef([]);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const currentIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const hasRecordedReadRef = useRef(false);
  const courseIdRef = useRef(null);

  const loadNotes = useCallback(async (code) => {
    const c = (code || "cs609").toString().trim().toLowerCase().replace(/\s+/g, "");
    try {
      let res = await fetch(`/${c}.json`);
      if (!res.ok) res = await fetch("/cs609.json");
      if (!res.ok) return [];
      const data = await res.json();
      return data.sections || [];
    } catch {
      try {
        const res = await fetch("/cs609.json");
        if (!res.ok) return [];
        const data = await res.json();
        return data.sections || [];
      } catch {
        return [];
      }
    }
  }, []);

  useEffect(() => {
    const state = location.state || {};
    const wantPlay = state.playVoice;
    const code = state.courseCode || "cs609";
    if (state.courseId) courseIdRef.current = state.courseId;
    if (wantPlay) {
      setPlayVoice(wantPlay);
      setCourseCode(code);
    }
  }, [location.state]);

  useEffect(() => {
    let cancelled = false;
    fetch("/cs609.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSections(data.sections || []);
      })
      .catch(() => { if (!cancelled) setSections([]); });

    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && ["s", "u", "a", "x", "p"].includes(e.key.toLowerCase())) || e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelled = true;
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!playVoice) return;
    let cancelled = false;
    loadNotes(courseCode).then((loaded) => {
      if (cancelled || !loaded.length) return;
      const sectionIndex = playVoice === "midterm" ? 0 : playVoice === "finalterm" ? 1 : 0;
      const section = loaded[sectionIndex] || loaded[0];
      const chunkList = parseHtmlToChunks(section?.html || "");
      if (!cancelled) {
        setSections(loaded);
        setChunks(chunkList);
        setActiveChunkIndex(-1);
        currentIndexRef.current = 0;
        if (chunkList.length > 0) startChunkTts(0, chunkList);
      }
    });
    return () => { cancelled = true; };
  }, [playVoice, courseCode, loadNotes]);

  const startChunkTts = useCallback((startIndex, chunkList) => {
    const list = chunkList || chunks;
    if (!list.length || startIndex >= list.length) {
      setPlayStatus("idle");
      setActiveChunkIndex(-1);
      return;
    }
    const synth = synthRef.current;
    if (!synth) return;

    setPlayStatus("playing");
    setActiveChunkIndex(startIndex);
    currentIndexRef.current = startIndex;
    const chunk = list[startIndex];
    const utterance = new SpeechSynthesisUtterance(chunk.text);
    utterance.rate = 0.9;
    utterance.lang = "en-US";

    const scrollToChunk = (idx) => {
      const el = chunkRefs.current[idx];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    scrollToChunk(startIndex);

    utterance.onend = () => {
      if (pausedRef.current) return;
      const next = startIndex + 1;
      if (next < list.length) startChunkTts(next, list);
      else {
        setPlayStatus("idle");
        setActiveChunkIndex(-1);
      }
    };
    utterance.onerror = () => {
      setPlayStatus("idle");
      setActiveChunkIndex(-1);
    };
    synth.cancel();
    synth.speak(utterance);
  }, [chunks]);

  const stopTts = useCallback(() => {
    pausedRef.current = false;
    synthRef.current?.cancel();
    setPlayStatus("idle");
    setActiveChunkIndex(-1);
  }, []);

  const pauseTts = useCallback(() => {
    if (synthRef.current?.speaking) {
      synthRef.current.pause();
      pausedRef.current = true;
      setPlayStatus("paused");
    }
  }, []);

  const resumeTts = useCallback(() => {
    if (synthRef.current?.paused) {
      synthRef.current.resume();
      pausedRef.current = false;
      setPlayStatus("playing");
    }
  }, []);

  const resumeFromPause = useCallback(() => {
    if (playStatus !== "paused") return;
    resumeTts();
  }, [playStatus, resumeTts]);

  useEffect(() => {
    chunkRefs.current = chunkRefs.current.slice(0, chunks.length);
  }, [chunks.length]);

  useEffect(() => {
    return () => synthRef.current?.cancel();
  }, []);

  const showVoiceSection = playVoice && chunks.length > 0;

  useEffect(() => {
    if (showVoiceSection || hasRecordedReadRef.current || sections.length === 0) return;
    const threshold = 150;
    const checkScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
      if (!nearBottom) return;
      hasRecordedReadRef.current = true;
      window.removeEventListener("scroll", checkScroll);
      apiFetch("/api/activity/record", {
        method: "POST",
        body: JSON.stringify({
          activityType: "short_notes_completed",
          courseId: courseIdRef.current || undefined,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.stats != null) {
            setReadCompleteNotification({
              percentage: data.stats.percentage ?? 0,
              courseId: courseIdRef.current,
            });
          }
        })
        .catch(() => {});
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showVoiceSection, sections.length]);
  const isPlaying = playStatus === "playing";
  const isPaused = playStatus === "paused";

  return (
    <div className="short-notes-container min-h-screen max-w-[74rem] mx-auto p-6 sm:p-12 pb-24">
      {readCompleteNotification != null && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 max-w-lg w-full mx-4 bg-green-600 text-white rounded-xl shadow-lg p-4 flex flex-col gap-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setReadCompleteNotification(null)}
              className="p-1 rounded hover:bg-white/20"
              aria-label="Dismiss"
            >
              <MdClose size={20} />
            </button>
          </div>
          <p className="font-semibold text-lg">Woww! 🎉</p>
          <p className="text-white/95">
            Just <strong>{readCompleteNotification.percentage}%</strong> people fully read the whole short notes.
            Now, you can practice the past papers to shine out your preparation.
          </p>
          <div className="flex gap-2 mt-1">
            {readCompleteNotification.courseId ? (
              <Link
                to={`/courses/${readCompleteNotification.courseId}`}
                className="px-4 py-2 bg-white text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
              >
                Practice Past Papers
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => setReadCompleteNotification(null)}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {showVoiceSection && (
        <div
          className="sticky top-0 z-20 -mx-6 -mt-6 px-6 py-3 bg-teal-600 text-white shadow-md flex flex-wrap items-center justify-between gap-2"
          style={{ marginBottom: "1rem" }}
        >
          <span className="font-medium">
            Voice: {playVoice === "midterm" ? "Midterm" : "Finalterm"} — {isPaused ? "Paused" : isPlaying ? "Playing…" : "Ready"}
          </span>
          <div className="flex items-center gap-2">
            {isPlaying && (
              <button type="button" onClick={pauseTts} className="p-2 rounded bg-white/20 hover:bg-white/30" aria-label="Pause">
                <MdPause size={22} />
              </button>
            )}
            {isPaused && (
              <button type="button" onClick={resumeFromPause} className="p-2 rounded bg-white/20 hover:bg-white/30" aria-label="Resume">
                <MdPlayArrow size={22} />
              </button>
            )}
            <button type="button" onClick={stopTts} className="p-2 rounded bg-red-500/80 hover:bg-red-500" aria-label="Stop">
              <MdStop size={22} />
            </button>
          </div>
        </div>
      )}

      {showVoiceSection ? (
        <div className="short-notes-section space-y-4">
          {chunks.map((chunk, i) => (
            <div
              key={i}
              ref={(el) => (chunkRefs.current[i] = el)}
              className={`transition-colors duration-300 rounded-md px-2 py-1 -mx-2 ${
                activeChunkIndex === i ? "bg-teal-100 ring-2 ring-teal-400 ring-inset" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: chunk.html }}
            />
          ))}
        </div>
      ) : (
        sections.map((section) => (
          <div key={section.id} className="short-notes-section" dangerouslySetInnerHTML={{ __html: section.html }} />
        ))
      )}
    </div>
  );
}
