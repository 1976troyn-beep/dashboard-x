import axios from 'axios';

const API = axios.create({
  
  baseURL: 'https://my-dashboard-pro.onrender.com', 
});

export const getSocialStats = () => API.get('/api/stats');
export const updateStat = (data) => API.post('/api/social-stats', data);








