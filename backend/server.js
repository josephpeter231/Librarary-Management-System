const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const PORT = 5000;
const pool = new Pool({
    database: 'librarymanagementsystem',
    user: 'postgres',
    password: 'root',
    port: 5432
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/addbook', async (req, res) => {
    try {
        const { title, author, publication_date, subject } = req.body;
        const newBook = await pool.query('INSERT INTO book (title, author, publication_date, subject) VALUES ($1, $2, $3, $4) RETURNING *', [title, author, publication_date, subject]);
        res.json(newBook.rows[0]);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/book', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM book');
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
