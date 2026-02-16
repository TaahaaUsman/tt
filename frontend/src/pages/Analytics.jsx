import { useState } from "react";
import {
  useAnalyticsStatsQuery,
  useAnalyticsSessionsQuery,
  useAnalyticsSessionQuery,
} from "../query/queries";
import Loader from "../components/Loader";

function formatDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString();
}

export default function Analytics() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const { data: stats, isLoading: statsLoading } = useAnalyticsStatsQuery();
  const { data: sessions = [], isLoading: sessionsLoading } = useAnalyticsSessionsQuery();
  const { data: sessionDetail, isLoading: detailLoading } = useAnalyticsSessionQuery(
    selectedSessionId,
    !!selectedSessionId
  );

  if (statsLoading) return <Loader />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalEvents ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Unique Sessions</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.uniqueSessions ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Page views (total)</p>
          <p className="text-2xl font-bold text-gray-900">
            {(stats?.pageViewCounts || []).reduce((s, p) => s + (p.count || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Mouse path records</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.mousePathCount ?? 0}</p>
        </div>
      </div>

      {/* Page views by path */}
      {stats?.pageViewCounts?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Page views by path</h2>
          <ul className="space-y-1 text-sm">
            {stats.pageViewCounts.map((p) => (
              <li key={p._id} className="flex justify-between">
                <span className="text-gray-700">{p._id || "(root)"}</span>
                <span className="font-medium">{p.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sessions list */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <h2 className="font-semibold text-gray-800 p-4 border-b border-gray-200">Sessions</h2>
        {sessionsLoading ? (
          <div className="p-8 text-center text-gray-500">Loading sessions...</div>
        ) : sessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No sessions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-700">Session ID</th>
                  <th className="text-left p-3 font-medium text-gray-700">First seen</th>
                  <th className="text-left p-3 font-medium text-gray-700">Last seen</th>
                  <th className="text-left p-3 font-medium text-gray-700">Events</th>
                  <th className="text-left p-3 font-medium text-gray-700">Page views</th>
                  <th className="text-left p-3 font-medium text-gray-700">Device</th>
                  <th className="text-left p-3 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr
                    key={s._id}
                    className={`border-b border-gray-100 ${selectedSessionId === s._id ? "bg-blue-50" : ""}`}
                  >
                    <td className="p-3 font-mono text-xs text-gray-600 max-w-[120px] truncate" title={s._id}>
                      {s._id}
                    </td>
                    <td className="p-3 text-gray-600">{formatDate(s.firstSeen)}</td>
                    <td className="p-3 text-gray-600">{formatDate(s.lastSeen)}</td>
                    <td className="p-3">{s.eventCount}</td>
                    <td className="p-3">{s.pageViews}</td>
                    <td className="p-3 text-gray-600">
                      {s.deviceInfo
                        ? `${s.deviceInfo.screenWidth || "?"}×${s.deviceInfo.screenHeight || "?"} · ${s.deviceInfo.platform || "?"}`
                        : "—"}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedSessionId(selectedSessionId === s._id ? null : s._id)}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedSessionId === s._id ? "Hide" : "View journey"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Session detail: journey + device */}
        {selectedSessionId && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {detailLoading ? (
              <p className="text-gray-500">Loading journey...</p>
            ) : sessionDetail ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Device info</h3>
                  <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                    {JSON.stringify(sessionDetail.deviceInfo || {}, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">User journey (events in order)</h3>
                  <ul className="space-y-1 text-sm">
                    {sessionDetail.events?.map((ev, i) => (
                      <li key={i} className="flex flex-wrap items-center gap-2">
                        <span className="text-gray-500 font-mono">{formatDate(ev.createdAt)}</span>
                        <span className="px-2 py-0.5 rounded bg-gray-200 font-medium">{ev.type}</span>
                        {ev.page && <span className="text-gray-700">{ev.page}</span>}
                        {ev.type === "page_view" && ev.payload?.fromPath != null && (
                          <span className="text-gray-500">from {ev.payload.fromPath || "(entry)"}</span>
                        )}
                        {ev.type === "mouse_path" && ev.payload?.points?.length > 0 && (
                          <span className="text-gray-500">{ev.payload.points.length} points</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
