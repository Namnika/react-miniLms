import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/users' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
