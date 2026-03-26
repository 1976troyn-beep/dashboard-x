import axios from 'axios';

const API = axios.create({
  // Это адрес твоего ЕДИНСТВЕННОГО живого сервера в Render
  baseURL: 'https://my-dashboard-pro.onrender.co', 
});

// Добавляем слэши в конце для стабильности
export const getSocialStats = () => API.get('/api/statsm/');
export const updateStat = (data) => API.post('/api/statsm/');

export default API;


 









 

