import axios from 'axios';

// ИСПРАВЛЕНО: Правильный домен .co
const API = axios.create({
  baseURL: 'https://my-dashboard-pro.onrender.com',
});

// ИСПРАВЛЕНО: Единый путь /api/statsm для получения и сохранения
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;









