const express = require('express');
const cors = require('cors');
const app = express();

// Render сам назначит порт через переменную окружения, либо используем 5000 для локалки
const PORT = process.env.PORT || 5000; 

// Настройка CORS, которая разрешает доступ твоему сайту на Vercel
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Твои тестовые данные (Mock Data)
const mockData = [
    { id: 1, platform: 'Instagram', followers: 1250, growth: 15.2, revenue: 450.5 },
    { id: 2, platform: 'YouTube', followers: 8900, growth: 5.7, revenue: 1200.0 },
    { id: 3, platform: 'TikTok', followers: 5400, growth: 25.4, revenue: 300.2 }
];

// Маршруты для получения данных
app.get('/api/social-stats', (req, res) => res.json(mockData));
app.get('/api/stats', (req, res) => res.json(mockData));
app.get('/api/analytics', (req, res) => res.json(mockData));

// Главная страница для проверки работоспособности сервера
app.get('/', (req, res) => res.send('Бэкенд в облаке активен и готов к работе!'));

// Запуск сервера на всех интерфейсах (0.0.0.0 важно для Render)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
