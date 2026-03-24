import axios from 'axios';

const API = axios.create({
  // Оставляем только основной вход в API
  baseURL: 'https://dashboard-x-onrender-com.onrender.com', 
});

// Теперь запросы будут склеиваться правильно:
// /api + /stats = /api/stats
// /api + /social-stats = /api/social-stats
export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;




