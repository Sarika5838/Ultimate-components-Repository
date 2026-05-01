import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
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

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminPanel /></PageWrapper>} />
        <Route path="/components" element={<PageWrapper><Search /></PageWrapper>} />
        <Route path="/components/:id" element={<PageWrapper><ComponentDetail /></PageWrapper>} />
        <Route path="/upload" element={<PageWrapper><UploadComponent /></PageWrapper>} />
        {/* Fallback route */}
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors duration-200">
        <Navbar />
        <Sidebar />
        
        <div className="flex-1 flex flex-col pt-16 md:pl-64 transition-all duration-300 min-h-screen">
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{ className: 'dark:bg-gray-800 dark:text-white' }} />
    </Router>
  );
}

export default App;
