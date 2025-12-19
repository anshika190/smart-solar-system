import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import LiveMonitoring from './pages/LiveMonitoring';
import Analytics from './pages/Analytics';
import SystemReports from './pages/SystemReports';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './App.css';



import Home from './pages/Home';

import SecretLogs from './pages/SecretLogs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect logic */}
          {/* Public Landing Page */}
          <Route index element={<LandingPage />} />

          <Route path="login" element={<div className="container-padding"><Login /></div>} />
          <Route path="register" element={<div className="container-padding"><Register /></div>} />
          <Route path="about" element={<div className="container-padding"><About /></div>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<div className="container-padding"><Home /></div>} />
            <Route path="monitor" element={<div className="container-padding"><LiveMonitoring /></div>} />
            <Route path="analytics" element={<div className="container-padding"><Analytics /></div>} />
            <Route path="system-reports" element={<div className="container-padding"><SystemReports /></div>} />
          </Route>

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
