import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Settings = () => {
  const [formData, setFormData] = useState({ platform: 'YouTube', followers: '', growth: '', revenue: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await axios.post('https://my-dashboard-pro.onrender.co', {
        platform: formData.platform,
        followers: Number(formData.followers) || 0,
        revenue: Number(formData.revenue) || 0,
        growth: Number(formData.growth) || 0
      });
      
      if (res.status === 200 || res.status === 201) {
        setStatus('success');
        setFormData(prev => ({ ...prev, followers: '', growth: '', revenue: '' }));
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error("Sync Error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white px-4">
      <motion.div variants={cardVariants} className="flex flex-col mb-8 px-2">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
          NODE <span className="text-[#C026D3] drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]">CONFIG</span>
        </h1>
      </motion.div>

      <motion.form variants={cardVariants} onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4 italic mb-3 md:mb-0">Выберите сеть:</span>
            <div className="flex flex-wrap gap-2">
              {['YouTube', 'Instagram', 'TikTok'].map((p) => (
                <button key={p} type="button" onClick={() => setFormData({ ...formData, platform: p })}
                  className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all border duration-300 ${
                    formData.platform === p ? 'bg-[#C026D3]/30 border-[#C026D3] text-white shadow-[0_0_20px_rgba(192,38,211,0.3)]' : 'bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-white/5'
                  }`}>{p}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input name="followers" type="number" value={formData.followers} onChange={(e) => setFormData({...formData, followers: e.target.value})} placeholder="Подписчики" required 
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 outline-none text-white font-black italic" />
            <input name="revenue" type="number" step="0.01" value={formData.revenue} onChange={(e) => setFormData({...formData, revenue: e.target.value})} placeholder="Доход ($)" required 
              className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-4 outline-none text-[#10B981] font-black italic" />
            <input name="growth" type="number" step="0.1" value={formData.growth} onChange={(e) => setFormData({...formData, growth: e.target.value})} placeholder="Рост (%)" required 
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 outline-none text-white font-black italic" />
          </div>
        </div>

        <div className="bg-white/[0.05] p-6 px-8 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-4">
            {status === 'loading' && <span className="text-[9px] text-blue-400 animate-pulse font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><RefreshCw size={14} className="animate-spin" /> Синхронизация...</span>}
            {status === 'success' && <span className="text-[9px] text-[#10B981] font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><CheckCircle size={14} /> Данные в облаке</span>}
            {status === 'error' && <span className="text-[9px] text-red-500 font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><AlertCircle size={14} /> Ошибка: Проверьте капчу</span>}
          </div>          
          <button type="submit" disabled={status === 'loading' || status === 'success'} className="flex items-center gap-3 px-10 py-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] italic transition-all bg-[#C026D3] hover:scale-105 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
            <Save size={16} /> Сохранить данные
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Settings;


