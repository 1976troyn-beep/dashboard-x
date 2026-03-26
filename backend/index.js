const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000; 

// 1. БРОНЕБОЙНЫЙ CORS (БЕЗ внешней библиотеки, только прямой контроль)
app.use((req, res, next) => {
    // Разрешаем доступ абсолютно всем (Vercel, localhost и т.д.)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // МГНОВЕННЫЙ ОТВЕТ НА ПРОВЕРКУ БРАУЗЕРА (OPTIONS)
    // Именно здесь браузер "зависает" в ошибку, если не получит 200 OK
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});

// 2. Настройка парсинга JSON (обязательно ПОСЛЕ заголовков CORS)
app.use(express.json());

let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

// 3. УНИВЕРСАЛЬНЫЙ МАРШРУТ
app.all(['/api/statsm', '/api/statsm/'], (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
        
        // Логируем в консоль Render, чтобы видеть, что данные долетели
        console.log('--- Incoming Data ---', req.body);

        const index = mockData.findIndex(item => 
            (item.platform || "").toLowerCase() === (platform || "").toLowerCase()
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
        
        // Ответ "OK" для фронтенда
        return res.json({ message: "OK", ...updatedItem });
    }
    
    // Если это GET запрос - отдаем данные
    res.json(mockData);
});

app.get('/', (req, res) => res.send('SYSTEM ONLINE: CORS BYPASSED'));

// 4. ЗАПУСК
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is blasting on port ${PORT}`);
});
