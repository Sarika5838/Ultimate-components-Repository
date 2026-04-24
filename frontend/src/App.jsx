import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import ComponentDetail from './pages/ComponentDetail';
import UploadComponent from './pages/UploadComponent';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors duration-200">
        <Navbar />
        <Sidebar />
        
        <div className="flex-1 flex flex-col pt-16 md:pl-64 transition-all duration-300 min-h-screen">
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/components" element={<Search />} />
              <Route path="/components/:id" element={<ComponentDetail />} />
              <Route path="/upload" element={<UploadComponent />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
