import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { Activity, Loader2, Zap } from 'lucide-react'
import { ResponsiveContainer, XAxis, CartesianGrid, Tooltip, Line, ComposedChart, Area } from 'recharts'
import axios from 'axios'

const GrowthOrbit = ({ value }) => (
  <div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
    <div className="relative z-10 flex flex-col items-center">
      <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest opacity-60 mb-0.5">Growth</span>
      <span className="text-xl font-black italic text-white leading-none">{value}%</span>
    </div>
    <div className="absolute inset-0 border border-white/5 rounded-full border-dashed" />
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#C026D3] shadow-[0_0_12px_rgba(192,38,211,0.9)]"
          style={{ top: '50%', left: '50%', transform: `rotate(${i * 120}deg) translate(38px) rotate(-${i * 120}deg)` }}
        />
      ))}
    </motion.div>
  </div>
);

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, { duration: 2, onUpdate: (latest) => setDisplayValue(Math.floor(latest)) })
    return () => controls.stop()
  }, [value])
  return <span>{displayValue.toLocaleString()}</span>
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://my-dashboard-pro.onrender.co/api/statsm/')
    .then(res => { 
      setStats(Array.isArray(res.data) ? res.data : []); 
      setLoading(false); 
    })
    .catch((err) => {
      console.error("Dashboard Load Error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5 pb-10 max-w-[1300px] mx-auto text-white px-2">
      
      <motion.div variants={cardVariants} className="flex flex-col mb-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          CORE <span className="text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">DASHBOARD</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.slice(0, 3).map((p, i) => (
          <motion.div 
            key={i} 
            variants={cardVariants}
            whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
            className="
              bg-white/[0.01] 
              backdrop-blur-[40px] 
              border border-white/5 
              border-t-white/20 
              p-6 rounded-[2.5rem] 
              relative group overflow-hidden 
              shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
              flex justify-between items-center 
              transition-all duration-500
            "
          >
            <div className="relative z-10">
              <p className="text-[9px] uppercase font-black text-gray-400 tracking-[0.2em] italic mb-1">{p.platform}</p>
              <h4 className="text-2xl font-bold italic tracking-tighter text-white">
                <Counter value={Number(p.followers)} />
              </h4>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-xl font-black italic text-[#10B981] drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  $<Counter value={Number(p.revenue || 0)} />
                </div>
              </div>
            </div>
            <div className="relative z-10 ml-4"><GrowthOrbit value={p.growth || 0} /></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#C026D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        ))}
      </div>

      <motion.div variants={cardVariants} 
        className="bg-white/[0.02] backdrop-blur-[60px] border border-white/5 border-t-white/20 p-8 rounded-[2.5rem] relative shadow-2xl overflow-hidden"
      >
        <h3 className="text-[9px] font-black uppercase italic tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
          <Activity size={14} className="text-[#C026D3] animate-pulse" /> Efficiency Matrix
        </h3>
        <div style={{ width: '100%', height: '250px' }} className="relative z-10">
           <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stats}>
                 <defs>
                    <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#C026D3" stopOpacity={0.2}/><stop offset="95%" stopColor="#C026D3" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }} />
                 <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 17, 23, 0.95)', border: '1px solid #C026D320', borderRadius: '12px', backdropFilter: 'blur(10px)' }} />
                 <Area type="monotone" dataKey="followers" stroke="#C026D3" strokeWidth={2} fill="url(#colorPulse)" />
                 <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} dot={{ r: 4, fill: '#10B981' }} />
              </ComposedChart>
           </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={cardVariants} 
        className="bg-white/[0.01] backdrop-blur-[30px] border border-white/5 border-t-white/20 p-8 rounded-[2.5rem] relative shadow-2xl"
      >
        <div className="relative z-10 flex flex-col gap-6">
          <h3 className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em] flex items-center gap-2">
            <Zap size={14} className="text-[#C026D3]" /> Neural Sync 94.2%
          </h3>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: "94.2%" }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-[#C026D3] to-[#06B6D4]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

