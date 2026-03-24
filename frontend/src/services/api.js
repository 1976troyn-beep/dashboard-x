import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const getSocialStats = () => API.get('/stats');
export const updateStat = (data) => API.post('/social-stats', data);

export default API;
