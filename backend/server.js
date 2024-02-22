const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const PORT = 5000;
const pool = new Pool({
    connectionString: "postgres://default:EsNdwAZVO5c4@ep-divine-dream-a41khf81.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
});

const app = express();

app.use(bodyParser.json());
app.use(cors());



// Define the SQL query to insert values into the book table
const insertQuery = `
    INSERT INTO book (title, author, publication_date, subject)
    VALUES ($1, $2, $3, $4)
    RETURNING *
`;

// Function to insert books into the database
const insertBooks = async () => {
    try {
        const client = await pool.connect();
        await Promise.all(books.map(async (book, index) => {
            const result = await client.query(insertQuery, [book.title, book.author, book.publication_date, book.subject]);
            console.log(`Book ${index + 1} has been inserted successfully:`);
            console.log(result.rows[0]);
        }));
        client.release();
        console.log("All books have been inserted successfully");
    } catch (error) {
        console.error('Error inserting books:', error);
    }
};

// Call the function to insert books

// Route to add a book
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

// Route to get all books
app.get('/api/book', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM book');
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
