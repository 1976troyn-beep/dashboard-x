import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { Activity, Zap } from 'lucide-react'
import { ResponsiveContainer, XAxis, CartesianGrid, Tooltip, Line, ComposedChart, Area } from 'recharts'
import { getSocialStats } from '../services/api'; // Наш сервис

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, { duration: 2, onUpdate: (latest) => setDisplayValue(Math.floor(latest)) })
    return () => controls.stop()
  }, [value])
  return <span>{displayValue.toLocaleString()}</span>
}

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSocialStats() // Вызов через сервис
      .then(res => { 
        setStats(Array.isArray(res.data) ? res.data : []); 
        setLoading(false); 
      })
      .catch(err => { console.error("Load Error:", err); setLoading(false); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-10 max-w-[1300px] mx-auto text-white px-2">
      <h1 className="text-4xl font-black italic uppercase text-white">CORE <span className="text-[#C026D3]">DASHBOARD</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.slice(0, 3).map((p, i) => (
          <div key={i} className="bg-white/[0.01] backdrop-blur-[40px] border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center shadow-2xl">
            <div>
              <p className="text-[9px] uppercase font-black text-gray-400 italic mb-1">{p.platform}</p>
              <h4 className="text-2xl font-bold italic text-white"><Counter value={Number(p.followers)} /></h4>
              <div className="mt-4 pt-4 border-t border-white/5 text-xl font-black text-[#10B981]">$<Counter value={Number(p.revenue || 0)} /></div>
            </div>
            <div className="text-xl font-black text-white">{p.growth || 0}%</div>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.02] backdrop-blur-[60px] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-[9px] font-black uppercase text-gray-500 mb-6 flex items-center gap-2"><Activity size={14} className="text-[#C026D3]" /> Efficiency Matrix</h3>
        <div style={{ width: '100%', height: '250px' }}>
           <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stats}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="platform" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }} />
                 <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 17, 23, 0.95)', border: 'none', borderRadius: '12px' }} />
                 <Area type="monotone" dataKey="followers" stroke="#C026D3" fillOpacity={0.1} fill="#C026D3" />
                 <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} />
              </ComposedChart>
           </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
export default Dashboard;
