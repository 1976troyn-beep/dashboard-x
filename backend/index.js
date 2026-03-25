const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000; 

app.use(cors());
app.use(express.json());

// Наше временное хранилище (Mock DB)
let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

// УНИВЕРСАЛЬНЫЙ ЭНДПОИНТ (И сохраняет, и отдает)
app.all('/api/statsm', (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
        const index = mockData.findIndex(item => item.platform.toLowerCase() === platform.toLowerCase());
        
        if (index !== -1) {
            mockData[index] = { 
                platform, 
                followers: Number(followers) || 0, 
                growth: Number(growth) || 0, 
                revenue: Number(revenue) || 0 
            };
            return res.json(mockData[index]);
        }
        // Если платформы нет в списке - добавляем новую
        const newItem = { platform, followers, growth, revenue };
        mockData.push(newItem);
        return res.json(newItem);
    }
    
    if (req.method === 'GET') {
        return res.json(mockData);
    }
    
    res.status(405).send('Method Not Allowed');
});

app.get('/', (req, res) => res.send('Бэкенд СИНХРОНИЗИРОВАН и активен!'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер на порту ${PORT}`);
});
