import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function ViewBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Change initial page to 1

    useEffect(() => {
        fetchBooks();
    }, [page]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/book?page=${page}&limit=10`);
            if (page === 1) {
                setBooks(response.data.slice(0, 10)); // Slice the response to get the first 10 records
            } else {
                setBooks(prevBooks => [...prevBooks, ...response.data]); // Append additional records for pagination
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
            loading
        ) {
            return;
        }
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Library Management System</span>
                </div>
            </nav>
            <div className="card mt-4">
                <h2 className="card-header bg-info text-white">View Books</h2>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publication Date</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{formatDate(book.publication_date)}</td>
                                    <td>{book.subject}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <p>Loading...</p>}
                    <button onClick={loadMore} className="btn btn-primary mt-3">Load More</button>
                </div>
            </div>
        </div>
    );
}

export default ViewBooks;
