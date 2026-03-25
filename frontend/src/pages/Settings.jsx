import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Database, CheckCircle, RefreshCw, Activity, Zap, AlertCircle, Server } from 'lucide-react';
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
    
    // Подготовка данных (превращаем в числа для базы)
    const payload = {
        platform: formData.platform,
        followers: Number(formData.followers) || 0,
        growth: Number(formData.growth) || 0,
        revenue: Number(formData.revenue) || 0
    };

    try {
      // ИСПРАВЛЕНО: Полный и точный путь к твоему новому серверу
      const response = await axios.post('https://my-dashboard-pro.onrender.com/api/social-stats', payload);
      
      if (response.status === 200 || response.status === 201) {
        setStatus('success');
        // Очищаем только поля ввода, оставляя выбранную платформу
        setFormData(prev => ({ ...prev, followers: '', growth: '', revenue: '' }));
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Ошибка сохранения на сервере:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-10 max-w-[1300px] mx-auto text-white px-4"
    >
      <motion.div variants={cardVariants} className="flex flex-col mb-8 group px-2">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
          NODE <span className="text-[#C026D3] drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]">CONFIG</span>
        </h1>
        <div className="mt-2 flex items-center gap-4">
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
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4 italic mb-3 md:mb-0">Выберите сеть:</span>
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
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 tracking-[0.3em] italic leading-none">Подписчики</label>
              <input name="followers" type="number" value={formData.followers} onChange={handleChange} placeholder="Введите число" 
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 focus:border-[#C026D3]/50 focus:bg-white/[0.07] outline-none transition-all font-black text-xs italic text-white placeholder:text-gray-700" required />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-[#10B981] ml-3 tracking-[0.3em] italic leading-none">Доход ($)</label>
              <input name="revenue" type="number" step="0.01" value={formData.revenue} onChange={handleChange} placeholder="0.00" 
                className="w-full bg-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-4 focus:border-[#10B981] focus:bg-[#10B981]/10 outline-none transition-all font-black text-xs text-[#10B981] italic placeholder:text-[#10B981]/30" required />
            </div>
            <div className="space-y-3">
              <label className="text-[8px] uppercase font-black text-gray-500 ml-3 tracking-[0.3em] italic leading-none">Рост (%)</label>
              <input name="growth" type="number" step="0.1" value={formData.growth} onChange={handleChange} placeholder="0.0" 
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 focus:border-[#06B6D4]/50 focus:bg-white/[0.07] outline-none transition-all font-black text-xs italic text-white placeholder:text-gray-700" required />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.05] p-6 px-8 flex items-center justify-between border-t border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            {status === 'loading' && <span className="text-[9px] text-blue-400 animate-pulse font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><RefreshCw size={14} className="animate-spin" /> Синхронизация...</span>}
            {status === 'success' && <span className="text-[9px] text-[#10B981] font-black uppercase tracking-[0.25em] flex items-center gap-2 italic drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"><CheckCircle size={14} /> Данные успешно обновлены</span>}
            {status === 'error' && <span className="text-[9px] text-red-500 font-black uppercase tracking-[0.25em] flex items-center gap-2 italic"><AlertCircle size={14} /> Ошибка: Проверьте интернет или сервер</span>}
          </div>          
          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className={`flex items-center gap-3 px-10 py-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] italic transition-all duration-300 ${
              status === 'success' 
              ? 'bg-[#10B981] shadow-[0_10px_30px_rgba(16,185,129,0.3)]' 
              : 'bg-[#C026D3] shadow-[0_10px_30px_rgba(192,38,211,0.3)] hover:scale-105 active:scale-95'
            }`}
          >
            {status === 'success' ? (
              <><CheckCircle size={16} /> Готово!</>
            ) : status === 'loading' ? (
              <><RefreshCw size={16} className="animate-spin" /> Ждите...</>
            ) : (
              <><Save size={16} /> Сохранить данные</>
            )}
          </button>
        </div>
      </motion.form>

      {/* СТАТУС СИСТЕМЫ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 1, icon: Server, color: 'text-[#C026D3]', label: 'Сервер', val: 'Render Online' },
          { id: 2, icon: Activity, color: 'text-[#06B6D4]', label: 'API Эндпоинт', val: '/api/social-stats' },
          { id: 3, icon: Zap, color: 'text-[#10B981]', label: 'Связь', val: 'Активна' }
        ].map((item) => (
          <motion.div 
            key={item.id}
            variants={cardVariants}
            className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-3xl backdrop-blur-xl"
          >
            <item.icon className={item.color} size={20} />
            <div>
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{item.label}</p>
              <p className="text-[10px] font-bold italic text-white uppercase">{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Settings;
