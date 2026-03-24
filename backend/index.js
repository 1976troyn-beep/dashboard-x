const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'dashboard_db',
    waitForConnections: true,
    connectionLimit: 10
});

const getAllData = (req, res) => {
    pool.query("SELECT * FROM social_stats", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

app.get('/api/social-stats', getAllData);
app.get('/api/stats', getAllData);
app.get('/api/analytics', getAllData);

app.post('/api/social-stats', (req, res) => {
    const { platform } = req.body;
    const followers = parseInt(req.body.followers) || 0;
    const growth = parseFloat(req.body.growth) || 0;
    const revenue = parseFloat(req.body.revenue) || 0;

    console.log(` Получен запрос для ${platform}:`, { followers, growth, revenue });

    const sql = `
        INSERT INTO social_stats (platform, followers, growth, revenue) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        followers = VALUES(followers), 
        growth = VALUES(growth), 
        revenue = VALUES(revenue)
    `;

    pool.query(sql, [platform, followers, growth, revenue], (err, result) => {
        if (err) {
            console.error(' ОШИБКА ЗАПИСИ В БАЗУ:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log(` Данные для ${platform} успешно обновлены в базе!`);
        res.json({ message: "OK", id: result.insertId });
    });
});

app.get('/', (req, res) => res.send('Бэкенд активен и готов к работе!'));

app.listen(PORT, () => {
    console.log(` Сервер запущен на http://localhost:${PORT}`);
    console.log(` API доступно по адресам: /api/stats, /api/analytics, /api/social-stats`);
});