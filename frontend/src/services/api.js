import axios from 'axios';

const API = axios.create({
  // ВНИМАНИЕ: Ссылка должна вести на Render, а не на Vercel!
  baseURL: 'https://dashboard-x-onrender-com.onrender.com', 
});

// Эти функции будут добавлять /stats и /social-stats к ссылке выше
export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;
