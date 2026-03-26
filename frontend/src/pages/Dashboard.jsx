import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { Activity, Loader2, Zap, DollarSign } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, CartesianGrid, Tooltip, Line, ComposedChart } from 'recharts'
import axios from 'axios'

const GrowthOrbit = ({ value }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest opacity-60 mb-0.5">Growth</span>
        <span className="text-xl font-black italic text-white leading-none">{value}%</span>
      </div>
      <div className="absolute inset-0 border border-white/5 rounded-full border-dashed" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C026D3] shadow-[0_0_12px_rgba(192,38,211,0.9)]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 120}deg) translate(38px) rotate(-${i * 120}deg)`,
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-4 rounded-full bg-[#C026D3]/5 blur-xl" />
    </div>
  )
}

const DataMatrix = () => (
  <div className="grid grid-cols-4 gap-1 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.1, 1, 0.1], backgroundColor: i % 3 === 0 ? '#C026D3' : '#ffffff' }}
        transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, delay: (i % 5) * 0.3 }}
        className="w-1 h-1 rounded-full shadow-[0_0_5px_rgba(192,38,211,0.5)]"
      />
    ))}
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
  hidden: { opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" },
  visible: { 
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://my-dashboard-pro.onrender.com/api/stats').then(res => { 
      setStats(res.data || []); setLoading(false); 
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-white">
      <Loader2 className="animate-spin text-[#C026D3]" size={32} />
      <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-50 italic">Mining Intelligence Matrix...</p>
    </div>
  );

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5 pb-10 max-w-[1300px] mx-auto text-white px-2">
      
      <motion.div variants={cardVariants} className="flex flex-col mb-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
          CORE <span className="text-[#C026D3] drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">DASHBOARD</span>
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.5em] italic">Real-time Analytics Interface</p>
          <div className="h-[1px] w-full bg-gradient-to-r from-gray-500/20 to-transparent" />
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.slice(0, 3).map((p, i) => (
          <motion.div 
            key={i} 
            variants={cardVariants}
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="bg-white/[0.01] backdrop-blur-md border border-white/10 border-t-white/20 p-6 rounded-[2.5rem] relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center transition-all duration-500"
          >
            <div className="relative z-10">
              <p className="text-[9px] uppercase font-black text-gray-400 tracking-[0.2em] italic mb-1">{p.platform}</p>
              <h4 className="text-2xl font-bold italic tracking-tighter text-white leading-none">
                <Counter value={Number(p.followers)} />
              </h4>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-[8px] uppercase font-black text-gray-500 tracking-widest opacity-60 mb-1">Total Revenue</p>
                <div className="text-xl font-black italic text-[#10B981] drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  $<Counter value={Number(p.revenue || 0)} />
                </div>
              </div>
            </div>
            <div className="relative z-10 ml-4"><GrowthOrbit value={p.growth || 0} /></div>
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none"><DataMatrix /></div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={cardVariants} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 border-t-white/20 p-8 rounded-[2.5rem] relative group shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500">
        <h3 className="text-[9px] font-black uppercase italic tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 relative z-10">
          <Activity size={14} className="text-[#C026D3] animate-pulse" /> Revenue Efficiency Matrix
        </h3>
        <div className="h-[250px] w-full relative z-10 text-white">
           <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stats} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                 <defs>
                    <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#C026D3" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#C026D3" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="platform" interval={0} axisLine={false} tickLine={false} dy={20} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' }} />
                 <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 17, 23, 0.95)', border: '1px solid rgba(192, 38, 211, 0.2)', borderRadius: '12px', backdropFilter: 'blur(10px)', fontSize: '10px' }} />
                 <Area type="monotone" dataKey="followers" stroke="#C026D3" strokeWidth={2} fill="url(#colorPulse)" animationDuration={1500} />
                 <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#111' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }} />
              </ComposedChart>
           </ResponsiveContainer>
        </div>
      </motion.div>
      <motion.div 
        variants={cardVariants} 
        className="bg-white/[0.01] backdrop-blur-md border border-white/10 border-t-white/20 p-8 rounded-[2.5rem] relative group shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500"
      >
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <h3 className="text-[9px] font-black uppercase italic tracking-[0.3em] text-gray-500 mb-2 flex items-center gap-2">
                <Zap size={14} className="text-[#C026D3]" /> Neural Sync Velocity
              </h3>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white italic tracking-tighter leading-none">94.2%</span>
                <span className="text-[#C026D3] text-[10px] font-black italic uppercase tracking-widest pb-1 opacity-80 animate-pulse">Matrix Active</span>
              </div>
            </div>
            <div className="hidden md:flex gap-6 text-[8px] font-black uppercase tracking-[0.2em] text-gray-600 italic text-right">
              <div><span>Uptime: 99.9%</span><br/><span className="text-[#10B981]">Stable Connection</span></div>
              <div><span>Ping: 14ms</span><br/><span className="text-[#C026D3]">High Priority</span></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'TikTok', color: '#06B6D4', val: '88%' },
              { name: 'Instagram', color: '#C026D3', val: '92%' },
              { name: 'YouTube', color: '#ef4444', val: '76%' }
            ].map((node, idx) => (
              <div key={node.name} className="space-y-3">
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest italic">
                  <span className="text-gray-500">{node.name} Node</span>
                  <span style={{ color: node.color }}>{node.val}</span>
                </div>
                <div className="relative h-[4px] w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    animate={{ width: node.val, opacity: [0.6, 1, 0.6] }}
                    transition={{ width: { duration: 2.5, ease: "circOut", delay: idx * 0.2 }, opacity: { duration: 3, repeat: Infinity } }}
                    style={{ backgroundColor: node.color, boxShadow: `0 0 15px ${node.color}60` }}
                    className="absolute top-0 left-0 h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-white/5 mt-2 gap-4">
            <div className="flex gap-6 text-[7px] text-gray-600 font-bold uppercase tracking-[0.3em]">
               <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /><span>Master Server: Online</span></div>
               <div className="flex items-center gap-2"><Activity size={10} /><span>Encryption: AES-256 Bit</span></div>
            </div>
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="flex items-center gap-3">
              <span className="text-[7px] text-gray-700 font-black uppercase tracking-[0.5em]">Security Protocol Active</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C026D3]" />
            </motion.div>
          </div>
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#C026D3]/5 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
