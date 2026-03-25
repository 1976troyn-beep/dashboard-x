import axios from 'axios';

// ИСПРАВЛЕНО: Чистый домен БЕЗ слэша в конце
const API = axios.create({
  baseURL: 'https://my-dashboard-pro.onrender.co',
});

// ИСПРАВЛЕНО: Пути начинаются со слэша /
// Это даст правильный итоговый адрес: https://my-dashboard-pro.onrender.co
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;









