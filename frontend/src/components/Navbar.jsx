import { LayoutGrid } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-white/[0.01] backdrop-blur-[30px] sticky top-0 z-40 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-4 lg:hidden">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)} 
          className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-[#C026D3] shadow-[0_0_15px_rgba(192,38,211,0.2)]"
        >
          <LayoutGrid size={22} />
        </motion.button>
        <span className="text-[10px] font-black uppercase italic tracking-[0.3em] text-white opacity-40">
          ADMIN <span className="text-[#C026D3]">PRO</span>
        </span>
      </div>

      <div className="ml-auto flex items-center">
        <motion.div 
          whileHover={{ x: -2 }}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-white leading-none tracking-tight uppercase italic group-hover:text-[#C026D3] transition-colors">
              Andrey
            </p>
            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] mt-1.5 opacity-60">
             Access level mandate
            </p>
          </div>
          
          <div className="relative">
            <img 
              src="/my.jpg" 
              alt="Profile" 
              className="w-11 h-11 rounded-2xl border-2 border-white/10 object-cover group-hover:border-[#C026D3]/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0B0E14] animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          </div>
        </motion.div>

      </div>
    </header>
  )
}

export default Navbar
 

