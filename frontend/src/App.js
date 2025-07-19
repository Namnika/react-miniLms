import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import "./index.css";
import Signup from "./components/Auth/Signup";
import StudentDashboard from "./components/Student/StudentDashboard";
import CourseView from "./components/Student/CourseView";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

export const ProtectedRoute = ({ children, role }) => {
  const { user, authLoading } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading) {
      if (!user) { navigate("/login/users") }
      else if (role) {
        const allowedRoles = Array.isArray(role) ? role : [role];
        if (!allowedRoles.includes(user.role)) {
          navigate("/login/users");
        }
      }
    }



  }, [user, navigate, role, authLoading])

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#36d7b7" />
      </div>
    );
  }


  return user ? children : null;
}

export const SuperAdminRoute = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate("/login/users") }
    if (user == null) {<p>No Access to unauthorized user!</p>}
  }, [user, navigate])

  return children
}

function App() {
  return (
    <Router>
      <AuthProvider>

        <Routes>
          {/* <Route path="/login/users" element={<Login />} /> */}
          <Route path="/login/users" element={<Login />} />
          <Route path="/student/dashboard" element={
            <ProtectedRoute role={["student", "admin", "owner"]}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/courses/:id" element={
            <ProtectedRoute role={["student", "admin", "owner"]}>
              <CourseView />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role={["admin", "owner"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/users" element={
            <SuperAdminRoute role="owner">
              <Signup />
            </SuperAdminRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
