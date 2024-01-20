import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
