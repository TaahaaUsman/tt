import { useNavigate } from "react-router-dom";
import { MdMic } from "react-icons/md";

export default function VoiceNotes({ courseCode }) {
  const navigate = useNavigate();
  const code = (courseCode || "cs609").toString().trim().toLowerCase().replace(/\s+/g, "");

  const openNotesWithVoice = (type) => {
    navigate("/notes", { state: { playVoice: type, courseCode: code } });
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <MdMic className="text-teal-600" size={18} />
        Listen to short notes (voice) — opens on Notes page with highlight
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openNotesWithVoice("midterm")}
          className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Midterm Voice Notes
        </button>
        <button
          type="button"
          onClick={() => openNotesWithVoice("finalterm")}
          className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Finalterm Voice Notes
        </button>
      </div>
    </div>
  );
}
