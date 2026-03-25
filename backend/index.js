const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000; 

// Улучшенный CORS — разрешаем всё и всем
app.use(cors());
app.use(express.json());

// Логгер — будет писать в консоль каждый запрос!
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next();
});

let mockData = [
    { id: 1, platform: 'Instagram', followers: 1250, growth: 15.2, revenue: 450.5 },
    { id: 2, platform: 'YouTube', followers: 8900, growth: 5.7, revenue: 1200.0 },
    { id: 3, platform: 'TikTok', followers: 5400, growth: 25.4, revenue: 300.2 }
];

app.post('/api/social-stats', (req, res) => {
    const { platform, followers, growth, revenue } = req.body;
    console.log("Данные для сохранения:", req.body);

    const index = mockData.findIndex(item => item.platform === platform);
    if (index !== -1) {
        mockData[index] = { 
            ...mockData[index], 
            followers: Number(followers) || 0, 
            growth: Number(growth) || 0, 
            revenue: Number(revenue) || 0 
        };
        return res.status(200).json({ message: "OK", data: mockData[index] });
    }
    res.status(404).json({ message: "Platform not found" });
});

app.get('/api/stats', (req, res) => res.json(mockData));

app.get('/', (req, res) => res.send('Бэкенд my-dashboard-pro активен!'));

// Важно: слушаем на 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
