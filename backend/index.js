const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
});

app.use(express.json());

let mockData = [
    { platform: 'YouTube', followers: 0, growth: 0, revenue: 0 },
    { platform: 'Instagram', followers: 0, growth: 0, revenue: 0 },
    { platform: 'TikTok', followers: 0, growth: 0, revenue: 0 }
];

app.all(['/api/stats', '/api/statsm'], (req, res) => {
    if (req.method === 'POST') {
        const { platform, followers, growth, revenue } = req.body;
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

        if (index !== -1) mockData[index] = updatedItem; 
        else mockData.push(updatedItem);
        
        return res.status(200).json({ message: "OK", ...updatedItem });
    }
    res.status(200).json(mockData);
});

app.get('/', (req, res) => res.send('SERVER STATUS: ALL ROUTES SYNCED'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is blasting on port ${PORT}`);
});








