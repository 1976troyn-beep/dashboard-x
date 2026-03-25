const express = require('express');
const cors = require('cors');
const app = express();

// Порт для Render
const PORT = process.env.PORT || 10000; 

// 1. ЖЕСТКИЙ CORS FIX: Разрешаем всё!
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));

app.use(express.json());

// Логи в консоль Render (чтобы мы видели, что запросы долетают)
app.use((req, res, next) => {
    console.log(`>>> ${req.method} request to ${req.url}`);
    next();
});

// База данных в памяти
let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

// Единый эндпоинт, который мы прописали во Фронтенде
app.all('/api/statsm', (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
        console.log("Saving data for:", platform);

        const index = mockData.findIndex(item => 
            item.platform.toLowerCase() === (platform || "").toLowerCase()
        );
        
        const updatedItem = { 
            platform: platform || 'Unknown', 
            followers: Number(followers) || 0, 
            growth: Number(growth) || 0, 
            revenue: Number(revenue) || 0 
        };

        if (index !== -1) {
            mockData[index] = updatedItem;
        } else {
            mockData.push(updatedItem);
        }
        return res.status(200).json(updatedItem);
    }
    
    if (req.method === 'GET') {
        return res.status(200).json(mockData);
    }
    
    res.status(405).send('Method Not Allowed');
});

// Проверка жизни сервера
app.get('/', (req, res) => res.send('SERVER IS ONLINE AND OPEN!'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
});

