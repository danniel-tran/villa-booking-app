import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VillaDetailPage from './pages/VillaDetailPage';
import AdminDashboard from './pages/Admin/Dashboard';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/villa/:slug" element={<VillaDetailPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
    );
}

export default App;