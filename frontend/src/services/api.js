import axios from 'axios';

const API = axios.create({
  // ВАЖНО: Только HTTPS и СТРОГО БЕЗ слэша в конце!
  baseURL: 'https://my-dashboard-pro.onrender.co', 
});

// Пути начинаются со слэша, но НЕ заканчиваются им
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;
 











