const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000; 

// Разрешаем всё для Vercel, чтобы не было ошибок CORS
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

let mockData = [
    { id: 1, platform: 'Instagram', followers: 1250, growth: 15.2, revenue: 450.5 },
    { id: 2, platform: 'YouTube', followers: 8900, growth: 5.7, revenue: 1200.0 },
    { id: 3, platform: 'TikTok', followers: 5400, growth: 25.4, revenue: 300.2 }
];

// ОБЯЗАТЕЛЬНО: Маршрут для сохранения данных
app.post('/api/social-stats', (req, res) => {
    const { platform, followers, growth, revenue } = req.body;
    console.log("Данные получены:", req.body);

    const index = mockData.findIndex(item => item.platform === platform);
    if (index !== -1) {
        mockData[index] = { 
            ...mockData[index], 
            followers: Number(followers) || 0, 
            growth: Number(growth) || 0, 
            revenue: Number(revenue) || 0 
        };
        return res.status(200).json({ message: "OK" });
    }
    res.status(404).json({ message: "Platform not found" });
});

app.get('/api/stats', (req, res) => res.json(mockData));
app.get('/api/social-stats', (req, res) => res.json(mockData));

app.get('/', (req, res) => res.send('Бэкенд активен!'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер на порту ${PORT}`);
});
