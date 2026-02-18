import { FiBell, FiBook, FiCheckCircle, FiMessageSquare } from "react-icons/fi";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "course",
    title: "New content added to CS609",
    message: "Past papers for 2024 have been added to your course.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "quiz",
    title: "Quiz reminder",
    message: "Complete your CS101 MCQ quiz before the deadline.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "general",
    title: "Welcome to Buddy",
    message: "Get started by exploring courses and trying the AI chat.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "chat",
    title: "AI Chat ready",
    message: "Buddy AI is trained for Virtual University. Ask anything!",
    time: "2 days ago",
    read: true,
  },
];

function getIcon(type) {
  switch (type) {
    case "course":
      return <FiBook size={20} className="text-indigo-600" />;
    case "quiz":
      return <FiCheckCircle size={20} className="text-emerald-600" />;
    case "chat":
      return <FiMessageSquare size={20} className="text-blue-600" />;
    default:
      return <FiBell size={20} className="text-gray-600" />;
  }
}

export default function Notifications() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
            {unreadCount} unread
          </span>
        )}
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {MOCK_NOTIFICATIONS.map((n) => (
            <li
              key={n.id}
              className={`flex gap-4 p-4 hover:bg-gray-50/50 transition-colors ${
                !n.read ? "bg-indigo-50/30" : ""
              }`}
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-gray-900 ${!n.read ? "" : "font-medium"}`}>
                  {n.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
