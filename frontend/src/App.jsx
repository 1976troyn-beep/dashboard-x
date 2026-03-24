import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Platforms from './pages/Platforms';
import Settings from './pages/Settings';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-[#C026D3]/40">
        
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020408]">
          
          <div 
            className="absolute inset-0 opacity-[0.4]" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(192, 38, 211, 0.2) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(192, 38, 211, 0.2) 1.5px, transparent 1.5px)
              `,
              backgroundSize: '40px 40px',
              filter: 'drop-shadow(0 0 1px rgba(192, 38, 211, 0.2))'
            }}
          />
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.99, 1.01, 0.99] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #C026D3 2px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-[15%] -left-[10%] w-[70%] h-[70%] bg-[#C026D3]/30 rounded-full blur-[140px]" />
            <div className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[70%] bg-[#06B6D4]/20 rounded-full blur-[140px]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,6,0.8)_100%)]" />
        </div>

        <div className="relative z-10 flex min-h-screen bg-transparent">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="flex-1 flex flex-col min-w-0 w-full bg-transparent">
            <Navbar setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 overflow-y-auto bg-transparent custom-scrollbar">
              <div className="max-w-[1450px] mx-auto w-full p-6 lg:p-12">
                <AnimatedRoutes />
              </div>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};


