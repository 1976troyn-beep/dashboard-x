import axios from 'axios';

const API = axios.create({
  // Оставляем чистый домен
  baseURL: 'https://dashboard-x-onrender-com.onrender.com', 
});

// Добавляем /api прямо в пути запросов
export const getSocialStats = () => API.get('/api/stats');
export const updateStat = (data) => API.post('/api/social-stats', data);

export default API;





