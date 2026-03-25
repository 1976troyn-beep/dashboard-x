import React, { useState } from 'react';
import axios from 'axios';
import { Save, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

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
    e.preventDefault(); // Это критически важно!
    console.log("Кнопка нажата! Отправляем данные..."); 
    setStatus('loading');
    
    const payload = {
        platform: formData.platform,
        followers: Number(formData.followers) || 0,
        growth: Number(formData.growth) || 0,
        revenue: Number(formData.revenue) || 0
    };

    try {
      // ПРЯМОЙ ЗАПРОС БЕЗ СЛЭША В КОНЦЕ
      const response = await axios.post('https://my-dashboard-pro.onrender.co', payload);
      
      if (response.status === 200 || response.status === 201) {
        console.log("УСПЕХ:", response.data);
        setStatus('success');
        setFormData(prev => ({ ...prev, followers: '', growth: '', revenue: '' }));
        setTimeout(() => setStatus('idle'), 2000);
      }
    } catch (error) {
      console.error("ОШИБКА ОТПРАВКИ:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="p-8 text-white max-w-2xl mx-auto bg-white/5 rounded-3xl border border-white/10 mt-10">
      <h1 className="text-3xl font-black uppercase italic mb-8 text-[#C026D3]">Node Config</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2 mb-6">
          {['YouTube', 'Instagram', 'TikTok'].map((p) => (
            <button key={p} type="button" onClick={() => setFormData({ ...formData, platform: p })}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                formData.platform === p ? 'bg-[#C026D3] border-[#C026D3]' : 'bg-transparent border-white/10 text-gray-500'
              }`}>{p}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <input name="followers" type="number" value={formData.followers} onChange={handleChange} placeholder="Подписчики" required 
            className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#C026D3]" />
          <input name="revenue" type="number" step="0.01" value={formData.revenue} onChange={handleChange} placeholder="Доход ($)" required 
            className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#C026D3]" />
          <input name="growth" type="number" step="0.1" value={formData.growth} onChange={handleChange} placeholder="Рост (%)" required 
            className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#C026D3]" />
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="w-full bg-[#C026D3] p-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
          {status === 'loading' ? <RefreshCw className="animate-spin" /> : <Save />}
          {status === 'loading' ? 'Синхронизация...' : 'Сохранить данные'}
        </button>

        {status === 'success' && <p className="text-green-500 text-center font-black uppercase text-[10px] animate-bounce">Данные в облаке!</p>}
        {status === 'error' && <p className="text-red-500 text-center font-black uppercase text-[10px]">Ошибка соединения!</p>}
      </form>
    </div>
  );
};

export default Settings;
