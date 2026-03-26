import axios from 'axios';

// ИСПРАВЛЕНО: Официальный домен .com и СТРОГО БЕЗ слэша в конце
const API = axios.create({
  baseURL: 'https://my-dashboard-pro.onrender.com', 
});

// ИСПРАВЛЕНО: Пути без лишних слэшей
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;


 
 









 

