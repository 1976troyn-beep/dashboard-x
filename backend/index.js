const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const mockData = [
    { id: 1, platform: 'Instagram', followers: 1250, growth: 15.2, revenue: 450.5 },
    { id: 2, platform: 'YouTube', followers: 8900, growth: 5.7, revenue: 1200.0 },
    { id: 3, platform: 'TikTok', followers: 5400, growth: 25.4, revenue: 300.2 }
];

app.get('/api/social-stats', (req, res) => res.json(mockData));
app.get('/api/stats', (req, res) => res.json(mockData));
app.get('/api/analytics', (req, res) => res.json(mockData));

app.get('/', (req, res) => res.send('Бэкенд в облаке активен!'));

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
