import axios from 'axios';

const API = axios.create({
  // Точный адрес твоего сервера из панели Render
  baseURL: 'https://dashboard-x.onrender.com', 
});

// Добавляем /api прямо сюда
export const getSocialStats = () => API.get('/api/stats');
export const updateStat = (data) => API.post('/api/social-stats', data);

export default API;






