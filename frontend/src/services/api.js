import axios from 'axios';

const API = axios.create({
  // Обязательно добавь /api в конце ссылки!
  baseURL: 'https://dashboard-x-onrender-com.onrender.com', 
});

export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;
