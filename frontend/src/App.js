import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';
import Signup from './components/Auth/Signup';


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
{/* <Route
  path="/admin/dashboard"
  element={
    <PrivateRoute role="admin">
      <AdminDashboard />
    </PrivateRoute>
  }
/> */}




function App() {
  return (
    <Router>
      <Routes>
      <Route path='/users' element={<Signup />}/>
      <Route path='/login/users' element={<Login />}/>
        
        <Route path='/student/dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
