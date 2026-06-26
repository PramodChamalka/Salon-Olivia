import React from 'react';
// The App component's contents are currently a placeholder — please update this file first for a new design / component!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>);

}