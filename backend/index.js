const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000; 

// УСИЛЕННЫЙ CORS: Разрешаем всё для Vercel
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true
}));

app.use(express.json());

// Твои данные в памяти сервера
let mockData = [
    { id: 1, platform: 'Instagram', followers: 1250, growth: 15.2, revenue: 450.5 },
    { id: 2, platform: 'YouTube', followers: 8900, growth: 5.7, revenue: 1200.0 },
    { id: 3, platform: 'TikTok', followers: 5400, growth: 25.4, revenue: 300.2 }
];

// Приём данных из формы Settings
app.post('/api/social-stats', (req, res) => {
    const { platform, followers, growth, revenue } = req.body;
    console.log(`Данные получены для ${platform}:`, req.body);

    const index = mockData.findIndex(item => item.platform === platform);
    if (index !== -1) {
        mockData[index] = { 
            ...mockData[index], 
            followers: Number(followers) || 0, 
            growth: Number(growth) || 0, 
            revenue: Number(revenue) || 0 
        };
        res.status(200).json({ message: "OK" });
    } else {
        res.status(404).json({ message: "Platform not found" });
    }
});

// Маршруты для получения данных
app.get('/api/social-stats', (req, res) => res.json(mockData));
app.get('/api/stats', (req, res) => res.json(mockData));
app.get('/api/analytics', (req, res) => res.json(mockData));

// Проверка работы сервера
app.get('/', (req, res) => res.send('Бэкенд в облаке активен и готов к работе!'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
