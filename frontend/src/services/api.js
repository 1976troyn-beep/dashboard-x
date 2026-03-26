import axios from 'axios';

const API = axios.create({
  // СТРОГО БЕЗ СЛЭША В КОНЦЕ
  baseURL: 'https://my-dashboard-pro.onrender.co', 
});

// ПУТИ БЕЗ СЛЭША В КОНЦЕ (самый стабильный вариант для Express 5)
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;


 









 

