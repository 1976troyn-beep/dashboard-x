import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [followers, setFollowers] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [loading, setLoading] = useState(false);

  const sendData = async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    setLoading(true);
    console.log("ПОПЫТКА ОТПРАВКИ НА СЕРВЕР...");

    try {
      const res = await axios.post('https://my-dashboard-pro.onrender.co', {
        platform: platform,
        followers: Number(followers) || 0,
        revenue: 0,
        growth: 0
      });
      
      console.log("СЕРВЕР ОТВЕТИЛ:", res.data);
      alert("ДАННЫЕ УСПЕШНО СОХРАНЕНЫ!");
      setFollowers('');
    } catch (err) {
      console.error("ОШИБКА СВЯЗИ:", err);
      alert("ОШИБКА: Сервер не отвечает или CORS блокирует запрос");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', color: 'white', background: '#080A0F', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px' }}>NODE CONFIG v2.0</h1>
      
      <form onSubmit={sendData} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          style={{ padding: '15px', background: '#1A1D23', color: 'white', borderRadius: '12px', border: '1px solid #333' }}
        >
          <option value="YouTube">YouTube</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
        </select>

        <input 
          type="number" 
          placeholder="Число подписчиков" 
          value={followers}
          onChange={(e) => setFollowers(e.target.value)}
          required
          style={{ padding: '15px', background: '#1A1D23', color: 'white', borderRadius: '12px', border: '1px solid #333' }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '20px', 
            background: '#C026D3', 
            color: 'white', 
            fontWeight: '900', 
            borderRadius: '12px', 
            cursor: 'pointer',
            border: 'none'
          }}
        >
          {loading ? 'СИНХРОНИЗАЦИЯ...' : 'СОХРАНИТЬ В ОБЛАКО'}
        </button>
      </form>
      
      <p style={{ marginTop: '20px', fontSize: '10px', color: '#555' }}>
        Status: {loading ? 'Sending...' : 'Ready'}
      </p>
    </div>
  );
};

export default Settings;
