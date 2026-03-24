import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dashboard-x.onrender.com/api/social-stats', 
});

export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;



