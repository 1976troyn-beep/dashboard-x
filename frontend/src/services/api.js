import axios from 'axios';

const API = axios.create({
  // ВАЖНО 1: Обязательно HTTPS (не http)
  // ВАЖНО 2: В КОНЦЕ НЕ ДОЛЖНО БЫТЬ СЛЭША /
  baseURL: 'https://my-dashboard-pro.onrender.co', 
});

// ВАЖНО 3: Пути без слэша на конце
export const getSocialStats = () => API.get('/api/statsm');
export const updateStat = (data) => API.post('/api/statsm', data);

export default API;











