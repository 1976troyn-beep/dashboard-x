import axios from 'axios';

const API = axios.create({
  baseURL: 'https://my-dashboard-pro.onrender.co', // СТРОГО БЕЗ СЛЭША /
});

// ПУТИ БЕЗ СЛЭША В КОНЦЕ
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;

 









 

