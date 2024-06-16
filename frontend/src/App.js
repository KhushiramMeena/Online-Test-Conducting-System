import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Homepage from './components/basic/Homepage/Homepage';
import DashboradMain from './components/Dashboard/Main/dashboradMain';
import StudentRegister from './components/StudentRegister/StudentRegisterPage/studentRegister';
import AddTeacher from './components/Dashboard/AddTeacher/AddTeacher';
import AddSubject from './components/Dashboard/AddSubject/AddSubject';
import LoginPage from './components/pages/loginPage/loginPage';
import StudentHomepage from './components/pages/studentHomepage/studentHomepage';
import TeacherHomepage from './components/pages/teacherHomepage/teacherHomepage';
import StudentRegisterPage from './components/pages/studentRegisterPage/studentRegisterPage';
import TestPage from './components/pages/TakeTest/TestPage';

function App({ onRoleSwitch }) {
  const [role, setRole] = useState(localStorage.getItem('role') || 'admin');

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    onRoleSwitch(selectedRole);
  };

  return (
    <Router>
      {role === 'admin' ? (
        <div>
          <button className="role-switch-button" onClick={() => handleRoleSwitch('users')}>
            Switch to Users
          </button>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/home" element={<DashboradMain />} />
            <Route exact path="/register" element={<StudentRegister />} />
            <Route exact path="/addTeacher" element={<AddTeacher />} />
            <Route exact path="/addSubject" element={<AddSubject />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <div>
          <button className="role-switch-button" onClick={() => handleRoleSwitch('admin')}>
            Switch to Admin
          </button>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/homeStudent" element={<StudentHomepage />} />
            <Route exact path="/homeTeacher" element={<TeacherHomepage />} />
            <Route exact path="/studentRegisterPage" element={<StudentRegisterPage />} />
            <Route exact path="/takeTestPage" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
