import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Artikelpage from "./pages/Artikelpage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminArticles from "./pages/AdminArticles";
import AdminArticleForm from "./pages/AdminArticleForm";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/artikel/:id" element={<Artikelpage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute>
              <AdminArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/new"
          element={
            <ProtectedRoute>
              <AdminArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/:id"
          element={
            <ProtectedRoute>
              <AdminArticleForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;