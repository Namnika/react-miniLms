import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/users' element={<Login />}/>
        <Route path='/' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
