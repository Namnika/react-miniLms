import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import "./index.css";
import Signup from "./components/Auth/Signup";
import StudentDashboard from "./components/Student/StudentDashboard";
import CourseView from "./components/Student/CourseView";

// const PrivateRoute = ({ children, role }) => {
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (!token || !user) return <Navigate to="/login" />;

//   // Optionally check role
//   if (role && user.role !== role) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default PrivateRoute;
// eslint-disable-next-line no-lone-blocks
{
  /* */
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/users" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses/course-view" element={<CourseView />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
              <SignUp/> // superadmin 
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
