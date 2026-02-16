import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { apiFetch } from "./client";

const fetchJson = (res) => (res.ok ? res.json() : Promise.reject(res));

// --- Auth (sync to Redux in AuthSync component) ---
export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiFetch("/api/auth/getUser").then(fetchJson),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// --- Courses ---
export function useCoursesQuery() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => apiFetch("/api/courses").then(fetchJson).then((d) => d.data || []),
  });
}

export function useBookmarkedQuery(enabled = true) {
  return useQuery({
    queryKey: ["bookmarked"],
    queryFn: () =>
      apiFetch("/api/courses/getBookmarked")
        .then((res) => (res.ok ? res.json() : { data: [] }))
        .then((d) => d.data || []),
    enabled,
  });
}

export function useCourseDetailsQuery(courseId) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () =>
      apiFetch("/api/courses/getCourseDetails", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      })
        .then(fetchJson)
        .then((d) => d.data),
    enabled: !!courseId,
  });
}

export function useQuizQuery(type, courseId) {
  return useQuery({
    queryKey: ["quiz", type, courseId],
    queryFn: () =>
      apiFetch("/api/quiz/getQuiz", {
        method: "POST",
        body: JSON.stringify({ type, courseId }),
      }).then(fetchJson),
    enabled: !!(type && courseId),
  });
}

export function usePastPapersListQuery(courseId) {
  return useQuery({
    queryKey: ["pastpapers", courseId],
    queryFn: () =>
      apiFetch("/api/pastpaper/list", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      })
        .then(fetchJson)
        .then((d) => d.papers || []),
    enabled: !!courseId,
  });
}

export function usePastPaperQuery(courseId, paperId) {
  return useQuery({
    queryKey: ["pastpaper", courseId, paperId],
    queryFn: () =>
      apiFetch("/api/pastpaper/getPaper", {
        method: "POST",
        body: JSON.stringify({ courseId, paperId }),
      }).then(fetchJson),
    enabled: !!(courseId && paperId),
  });
}

export function useSubjectiveQuestionsQuery(courseId) {
  return useQuery({
    queryKey: ["subjective", courseId],
    queryFn: () =>
      apiFetch("/api/subjective/getQuestions", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      })
        .then(fetchJson)
        .then((d) => d.questions || []),
    enabled: !!courseId,
  });
}

// --- Analytics ---
export function useAnalyticsStatsQuery() {
  return useQuery({
    queryKey: ["analytics", "stats"],
    queryFn: () => apiFetch("/api/analytics/stats").then(fetchJson),
  });
}

export function useAnalyticsSessionsQuery(limit = 100) {
  return useQuery({
    queryKey: ["analytics", "sessions", limit],
    queryFn: () => apiFetch(`/api/analytics/sessions?limit=${limit}`).then(fetchJson).then((d) => d.sessions || []),
  });
}

export function useAnalyticsSessionQuery(sessionId, enabled = true) {
  return useQuery({
    queryKey: ["analytics", "session", sessionId],
    queryFn: () => apiFetch(`/api/analytics/session/${encodeURIComponent(sessionId)}`).then(fetchJson),
    enabled: !!(sessionId && enabled),
  });
}

export function useAnalyticsUsersQuery(enabled = true) {
  return useQuery({
    queryKey: ["analytics", "users"],
    queryFn: () => apiFetch("/api/analytics/users").then(fetchJson).then((d) => d.users || []),
    enabled,
  });
}

export function useAnalyticsUserActivityQuery(userId, enabled = true) {
  return useQuery({
    queryKey: ["analytics", "user", userId],
    queryFn: () =>
      apiFetch(`/api/analytics/user/${encodeURIComponent(userId)}`).then(fetchJson),
    enabled: !!(userId && enabled),
  });
}

// --- Mutations ---
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (body) => apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(body) }).then(fetchJson),
    onSuccess: (data) => {
      if (data?.user) dispatch(setUser({ _id: data.user.id, name: data.user.name, email: data.user.email, profilePictureUrl: data.user.profilePicture, role: data.user.role || "user" }));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useBookmarkMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) =>
      apiFetch("/api/courses/bookmark", { method: "POST", body: JSON.stringify({ courseId }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarked"] }),
  });
}

export function useUnbookmarkMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) =>
      apiFetch("/api/courses/unbookmark", { method: "DELETE", body: JSON.stringify({ courseId }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarked"] }),
  });
}

export function useUploadMutation() {
  return useMutation({
    mutationFn: (body) =>
      apiFetch("/api/upload", { method: "POST", body: JSON.stringify(body) }).then(fetchJson),
  });
}

export function useSubmitSubjectiveMutation() {
  return useMutation({
    mutationFn: ({ courseId, attempts }) =>
      apiFetch("/api/subjective/submitAnswers", {
        method: "POST",
        body: JSON.stringify({ courseId, attempts }),
      }).then((res) => (res.ok ? res.json() : Promise.reject(res))),
  });
}
