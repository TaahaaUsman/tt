import { useState } from "react";
import {
  useAnalyticsStatsQuery,
  useAnalyticsSessionsQuery,
  useAnalyticsSessionQuery,
  useAnalyticsUsersQuery,
  useAnalyticsUserActivityQuery,
} from "../query/queries";
import Loader from "../components/Loader";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString();
}

export default function Admin() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data: stats, isLoading: statsLoading, isError: statsError } = useAnalyticsStatsQuery();
  const { data: sessions = [], isLoading: sessionsLoading } = useAnalyticsSessionsQuery();
  const { data: sessionDetail, isLoading: detailLoading } = useAnalyticsSessionQuery(
    selectedSessionId,
    !!selectedSessionId
  );
  const { data: users = [], isLoading: usersLoading } = useAnalyticsUsersQuery();
  const { data: userActivity, isLoading: userActivityLoading } = useAnalyticsUserActivityQuery(
    selectedUserId,
    !!selectedUserId
  );

  if (statsLoading) return <Loader />;
  if (statsError) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <p className="text-red-600 font-medium">Access denied. Super admin only.</p>
        <p className="text-gray-600 text-sm mt-2">Sign in with a super admin account to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
      <p className="text-gray-600 text-sm mb-6">All analytics: sessions (including anonymous) and signed-in users.</p>

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
          <p className="text-sm text-gray-500">Page views</p>
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

      {/* Users with activity (signed-in users) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <h2 className="font-semibold text-gray-800 p-4 border-b border-gray-200">Users with activity (signed-in)</h2>
        {usersLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No signed-in user activity yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-700">User</th>
                  <th className="text-left p-3 font-medium text-gray-700">Email</th>
                  <th className="text-left p-3 font-medium text-gray-700">First seen</th>
                  <th className="text-left p-3 font-medium text-gray-700">Last seen</th>
                  <th className="text-left p-3 font-medium text-gray-700">Events</th>
                  <th className="text-left p-3 font-medium text-gray-700">Page views</th>
                  <th className="text-left p-3 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.userId}
                    className={`border-b border-gray-100 ${selectedUserId === u.userId ? "bg-blue-50" : ""}`}
                  >
                    <td className="p-3 font-medium text-gray-800">{u.name || "—"}</td>
                    <td className="p-3 text-gray-600">{u.email || "—"}</td>
                    <td className="p-3 text-gray-600">{formatDate(u.firstSeen)}</td>
                    <td className="p-3 text-gray-600">{formatDate(u.lastSeen)}</td>
                    <td className="p-3">{u.eventCount}</td>
                    <td className="p-3">{u.pageViews}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(selectedUserId === u.userId ? null : u.userId)}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedUserId === u.userId ? "Hide" : "View journey"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedUserId && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {userActivityLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : userActivity?.events?.length ? (
              <div>
                <h3 className="font-medium text-gray-800 mb-2">User journey (this user only)</h3>
                <ul className="space-y-1 text-sm">
                  {userActivity.events.map((ev, i) => (
                    <li key={i} className="flex flex-wrap items-center gap-2">
                      <span className="text-gray-500 font-mono">{formatDate(ev.createdAt)}</span>
                      <span className="px-2 py-0.5 rounded bg-gray-200 font-medium">{ev.type}</span>
                      {ev.page && <span className="text-gray-700">{ev.page}</span>}
                      {ev.type === "page_view" && ev.payload?.fromPath != null && (
                        <span className="text-gray-500">from {ev.payload.fromPath || "(entry)"}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">No events.</p>
            )}
          </div>
        )}
      </div>

      {/* All sessions (anonymous + any) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <h2 className="font-semibold text-gray-800 p-4 border-b border-gray-200">All sessions</h2>
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
                        ? `${s.deviceInfo.screenWidth || "?"}×${s.deviceInfo.screenHeight || "?"}`
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
        {selectedSessionId && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {detailLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : sessionDetail ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Device info</h3>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                    {JSON.stringify(sessionDetail.deviceInfo || {}, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Journey (events)</h3>
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
