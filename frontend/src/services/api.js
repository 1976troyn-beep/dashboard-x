import axios from 'axios';

const API = axios.create({
  baseURL: 'https://my-dashboard-pro.onrender.co', // СТРОГО БЕЗ СЛЭША В КОНЦЕ
});

// ДОБАВИЛИ СЛЭШИ В КОНЦЕ ПУТЕЙ
export const getSocialStats = () => API.get('/api/statsm/');
export const updateStat = (data) => API.post('/api/statsm/', data);

export default API;

 









 

