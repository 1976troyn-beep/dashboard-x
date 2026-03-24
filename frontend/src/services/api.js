import axios from 'axios';

const API = axios.create({
  // Я добавил /api в конец ссылки, чтобы сервер тебя "услышал"
 baseURL: 'https://dashboard-x.onrender.com',
 
});

export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;


