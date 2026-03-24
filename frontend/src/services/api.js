import axios from 'axios';

const API = axios.create({
  // Оставляем чистую ссылку на твой Render
  baseURL: 'https://dashboard-x-onrender-com.onrender.com', 
});

// Добавляем /api прямо сюда — так надежнее
export const getSocialStats = () => API.get('/api/stats');
export const updateStat = (data) => API.post('/api/social-stats', data);

export default API;





