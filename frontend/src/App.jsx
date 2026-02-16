import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthSync from "./components/AuthSync";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Quiz from "./pages/Quiz";
import PastPaperQuiz from "./pages/PastPaperQuiz";
import Notes from "./pages/Notes";
import SubjectiveQuestions from "./pages/SubjectiveQuestions";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import FloatingChat from "./components/FloatingChat";
import AnalyticsTracker from "./components/AnalyticsTracker";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return children;
}

function SuperAdminRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "superadmin") return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>

      <Route path="/quiz/pastpaper/:courseId/:paperId" element={<ProtectedRoute><PastPaperQuiz /></ProtectedRoute>} />
      <Route path="/quiz/:type/:courseId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="courses/:courseId/questions" element={<ProtectedRoute><SubjectiveQuestions /></ProtectedRoute>} />
        <Route path="contact" element={<Contact />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="admin" element={<SuperAdminRoute><Admin /></SuperAdminRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthSync>
      <AnalyticsTracker />
      <AppRoutes />
      <FloatingChat />
    </AuthSync>
  );
}
