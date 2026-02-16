import { useNavigate } from "react-router-dom";
import VoiceNotes from "./VoiceNotes";
const pdf = "/assets/Images/pdf.png";

export default function ShortNotes({ courseCode, courseId }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <img src={pdf} alt="Handout Preview" className="w-16 h-16" />
        <button
          onClick={() => navigate("/notes", { state: { courseId } })}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
        >
          View Short Notes
        </button>
      </div>
      <VoiceNotes courseCode={courseCode} />
    </div>
  );
}
