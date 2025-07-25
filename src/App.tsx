import './App.css'

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
};

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInRegNo = localStorage.getItem('loggedInRegNo');
    if (!loggedInRegNo) navigate('/login');
  }, [navigate]);

  return <HomePage />;
};

export default App;
