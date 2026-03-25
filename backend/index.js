const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000; 

// 1. РУЧНОЙ ОБРАБОТЧИК CORS (Надежнее, чем библиотека)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // МГНОВЕННЫЙ ОТВЕТ НА ПРОВЕРКУ БРАУЗЕРА (Preflight)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

app.all('/api/statsm', (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
        const index = mockData.findIndex(item => item.platform.toLowerCase() === (platform || "").toLowerCase());
        const updatedItem = { platform: platform || 'Unknown', followers: Number(followers) || 0, growth: Number(growth) || 0, revenue: Number(revenue) || 0 };
        if (index !== -1) mockData[index] = updatedItem; else mockData.push(updatedItem);
        return res.json(updatedItem);
    }
    res.json(mockData);
});

app.get('/', (req, res) => res.send('SERVER IS OPEN!'));

app.listen(PORT, '0.0.0.0', () => console.log(`Live on ${PORT}`));
