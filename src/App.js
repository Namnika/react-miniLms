import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';
import Signup from './components/Auth/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/users/params' element={<Login />}/>
        <Route path='/users' element={<Signup />}/>
        <Route path='/' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
