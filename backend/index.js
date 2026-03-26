const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// 1. ЖЕСТКИЙ CORS ДЛЯ ВСЕХ
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

// 2. ГЛАВНЫЙ МАРШРУТ (Принимает и GET, и POST)
app.all('/api/statsm', (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
        console.log('--- DATA RECEIVED ---', req.body);

        const index = mockData.findIndex(item => 
            (item.platform || "").toLowerCase() === (platform || "").toLowerCase()
        );
        
        const updatedItem = { 
            platform: platform || 'Unknown', 
            followers: Number(followers) || 0, 
            growth: Number(growth) || 0, 
            revenue: Number(revenue) || 0 
        };

        if (index !== -1) mockData[index] = updatedItem; 
        else mockData.push(updatedItem);
        
        return res.status(200).json({ message: "OK", ...updatedItem });
    }
    
    // Если GET - отдаем данные
    res.status(200).json(mockData);
});

// Заглушка для главной
app.get('/', (req, res) => res.send('SERVER STATUS: READY'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});



