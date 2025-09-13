import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/Student/Dashboard';
import ApplyLeave from './pages/Student/ApplyLeave';
import FacultyDashboard from './pages/Faculty/Dashboard';
import RectorDashboard from './pages/Rector/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/apply" element={<ApplyLeave />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/rector/dashboard" element={<RectorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
