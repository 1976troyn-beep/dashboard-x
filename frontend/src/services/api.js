import axios from 'axios';

const API = axios.create({
  // ОБНОВЛЕНО: Новый адрес твоего сервера
  baseURL: 'https://my-dashboard-pro.onrender.com', 
});

// Эндпоинты остаются прежними
export const getSocialStats = () => API.get('/api/stats');
export const updateStat = (data) => API.post('/api/social-stats', data);








