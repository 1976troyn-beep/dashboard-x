import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, Share2, Settings, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Platforms', icon: Share2, path: '/platforms' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>
      <motion.div 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (window.innerWidth < 1024 ? "-100%" : 0) 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 bottom-0 w-72 bg-[#05070A]/60 backdrop-blur-[40px] border-r border-white/10 p-8 
          flex flex-col z-[110] shadow-[20px_0_100px_rgba(0,0,0,0.4)]
          lg:sticky lg:translate-x-0
          ${!isOpen ? 'max-lg:hidden' : 'flex'}
          lg:flex
        `}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-gray-500 hover:text-[#C026D3] z-[120]"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col mb-12 px-2 mt-4 lg:mt-0">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl tracking-tighter italic uppercase text-white">
              ADMIN<span className="text-[#C026D3]">PRO</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconElement = item.icon; 
            return (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="block group">
                <div className={`flex items-center gap-4 p-4 rounded-[1.2rem] border transition-all duration-300 ${isActive ? 'bg-[#C026D3]/15 border-[#C026D3]/30 text-white shadow-[0_0_20px_rgba(192,38,211,0.1)]' : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/[0.03]'}`}>
                  <IconElement size={20} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 px-2 flex flex-col space-y-1">
          <span className="text-white font-black text-sm uppercase italic tracking-wider">
            Andrey
          </span>
          <span className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.15em]">
            Administrator
          </span>
          <div className="pt-2">
            <motion.span 
              animate={{ 
                textShadow: [
                  "0 0 4px rgba(217,70,239,0.2)",
                  "0 0 12px rgba(217,70,239,0.8)",
                  "0 0 4px rgba(217,70,239,0.2)"
                ],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-[#D946EF] font-black text-[10px] uppercase italic tracking-[0.12em] brightness-125"
            >
              Access Level: Mandate
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;


