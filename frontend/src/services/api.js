

import axios from 'axios';

const API = axios.create({
  // baseURL СТРОГО БЕЗ СЛЭША В КОНЦЕ
  baseURL: 'https://my-dashboard-pro.onrender.co', 
});

// ПУТИ С ОБЯЗАТЕЛЬНЫМ СЛЭШЕМ В КОНЦЕ (чтобы не было редиректа)
export const getSocialStats = () => API.get('/api/statsm/');
export const updateStat = (data) => API.post('/api/statsm/', data);

export default API;


 









 

