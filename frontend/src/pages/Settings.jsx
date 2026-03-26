import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, RefreshCw } from 'lucide-react';
import { updateStat, getSocialStats } from '../services/api'; // Импортируем твои функции

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const Settings = () => {
  const initialFormState = { platform: 'YouTube', followers: '', growth: '', revenue: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchCurrentPlatformData = async () => {
      setStatus('loading');
      try {
        const response = await getSocialStats();
        const currentData = response.data.find(item => item.platform === formData.platform);
        
        if (currentData) {
          setFormData({
            platform: currentData.platform,
            followers: currentData.followers || '',
            growth: currentData.growth || '',
            revenue: currentData.revenue || ''
          });
        } else {
          setFormData(prev => ({ ...initialFormState, platform: prev.platform }));
        }
        setStatus('idle');
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setStatus('error');
      }
    };

    fetchCurrentPlatformData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.platform]); 

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await updateStat(formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      setStatus('error');
    }
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white">
      <motion.div variants={cardVariants} className="flex flex-col mb-8 px-2">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          NODE <span className="text-[#C026D3]">CONFIG</span>
        </h1>
      </motion.div>

      <motion.form variants={cardVariants} onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4 italic mb-3 md:mb-0">Selecting a social network:</span>
            <div className="flex flex-wrap gap-2">
              {['YouTube', 'Instagram', 'TikTok'].map((p) => (
                <button 
                  key={p} 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, platform: p }))}
                  className={`px-6 py-2.5 rounded-xl font-black uppercase text-[9px] transition-all border ${formData.platform === p ? 'bg-[#C026D3]/30 border-[#C026D3] text-white shadow-[0_0_20px_rgba(192,38,211,0.3)]' : 'bg-transparent border-transparent text-gray-500 hover:text-white'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 italic">Current Followers</label>
              <input name="followers" type="number" value={formData.followers} onChange={handleChange} placeholder="000,000" required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 outline-none font-black text-xs text-white transition-all focus:border-[#C026D3]/50" />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-[#10B981] ml-3 italic">Revenue ($)</label>
              <input name="revenue" type="number" value={formData.revenue} onChange={handleChange} placeholder="0.00" required
                className="w-full bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-4 outline-none font-black text-xs text-[#10B981] transition-all focus:border-[#10B981]" />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 italic">Growth (%)</label>
              <input name="growth" type="number" value={formData.growth} onChange={handleChange} placeholder="0.0" required
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 outline-none font-black text-xs text-white transition-all focus:border-[#C026D3]/50" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.05] p-6 px-8 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-4">
            {status === 'loading' && <span className="text-[9px] text-blue-400 animate-pulse font-black uppercase italic flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> Syncing with Cloud...</span>}
            {status === 'success' && <span className="text-[9px] text-[#10B981] font-black uppercase italic flex items-center gap-2"><CheckCircle2 size={14} /> Data Secured</span>}
            {status === 'error' && <span className="text-[9px] text-red-500 font-black uppercase italic">Connection Error</span>}
          </div>
          <button type="submit" disabled={status === 'loading'} className="flex items-center gap-3 bg-[#C026D3] px-10 py-3 rounded-2xl font-black uppercase text-[10px] italic shadow-lg hover:scale-105 active:scale-95 transition-all">
            <Save size={16} /> Commit Sync
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Settings;




