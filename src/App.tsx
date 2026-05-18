import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Speaking from "./pages/Speaking";
import Listening from "./pages/Listening";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAppStore();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/learn/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
        <Route path="/learn/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
        <Route path="/learn/speaking" element={<ProtectedRoute><Speaking /></ProtectedRoute>} />
        <Route path="/learn/listening" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
