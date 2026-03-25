import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Database, CheckCircle2, RefreshCw, Activity, Zap } from 'lucide-react';
import axios from 'axios';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" },
  visible: { 
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Settings = () => {
  const [formData, setFormData] = useState({
    platform: 'YouTube',
    followers: '',
    growth: '',
    revenue: '',
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post('http://localhost:5000/api/social-stats', formData);
      if (response.data.message === "OK") {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white"
    >
      <motion.div variants={cardVariants} className="flex flex-col mb-8 group px-2">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
          NODE <span className="text-[#C026D3] drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]">CONFIG</span>
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.5em] italic">INFRASTRUCTURE SETUP </p>
          <div className="h-[1px] w-full bg-gradient-to-r from-gray-500/20 to-transparent" />
        </div>
      </motion.div>
      <motion.form 
        variants={cardVariants}
        onSubmit={handleSubmit} 
        className="bg-white/[0.03] backdrop-blur-[30px] border border-white/10 border-t-white/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
      >
        <div className="p-8 space-y-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4 italic mb-3 md:mb-0">Selecting a social network:</span>
            <div className="flex flex-wrap gap-2">
              {['YouTube', 'Instagram', 'TikTok'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform: p })}
                  className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all border duration-300 ${
                    formData.platform === p 
                    ? 'bg-[#C026D3]/30 border-[#C026D3] text-white shadow-[0_0_20px_rgba(192,38,211,0.3)] scale-105' 
                    : 'bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 tracking-[0.3em] italic leading-none">Current Followers</label>
              <input name="followers" type="number" value={formData.followers} onChange={handleChange} placeholder="000,000" 
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 focus:border-[#C026D3]/50 focus:bg-white/[0.07] outline-none transition-all font-black text-xs italic text-white placeholder:text-gray-700" required />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-[#10B981] ml-3 tracking-[0.3em] italic leading-none">Revenue ($)</label>
              <input name="revenue" type="number" value={formData.revenue} onChange={handleChange} placeholder="0.00" 
                className="w-full bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-4 focus:border-[#10B981] focus:bg-[#10B981]/10 outline-none transition-all font-black text-xs text-[#10B981] italic placeholder:text-[#10B981]/30" required />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 tracking-[0.3em] italic leading-none">Growth (%)</label>
              <input name="growth" type="number" value={formData.growth} onChange={handleChange} placeholder="0.0" 
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 focus:border-[#06B6D4]/50 focus:bg-white/[0.07] outline-none transition-all font-black text-xs italic text-white placeholder:text-gray-700" required />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.05] p-6 px-8 flex items-center justify-between border-t border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            {status === 'loading' && <span className="text-[9px] text-blue-400 animate-pulse font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><RefreshCw size={14} className="animate-spin" /> Syncing Node...</span>}
            {status === 'success' && <span className="text-[9px] text-[#10B981] font-black uppercase tracking-[0.25em] flex items-center gap-2 italic drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"><CheckCircle2 size={14} /> Commit Verified</span>}
          </div>
          <button type="submit" disabled={status === 'loading'}
            className="flex items-center gap-3 bg-[#C026D3] px-10 py-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] italic shadow-[0_10px_30px_rgba(192,38,211,0.3)] hover:scale-105 active:scale-95 transition-all duration-300">
            <Save size={16} /> Commit Sync
          </button>
        </div>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 1, icon: Database, color: 'text-[#C026D3]', label: 'Database', val: 'MySQL Live Node' },
          { id: 2, icon: Activity, color: 'text-[#06B6D4]', label: 'Latency', val: '12ms Response' },
          { id: 3, icon: Zap, color: 'text-[#10B981]', label: 'Status', val: 'Node Optimized' }
        ].map((item) => (
          <motion.div 
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)' }}
            className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 border-t-white/10 transition-all duration-500 shadow-xl"
          >
             <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <item.icon size={20} className={item.color} />
             </div>
             <div>
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em] leading-none italic">{item.label}</p>
                <p className="text-[11px] font-bold text-white uppercase italic mt-2 tracking-tight">{item.val}</p>
             </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Settings;



