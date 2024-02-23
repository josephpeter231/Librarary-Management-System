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
    const [filters, setFilters] = useState({
        title: '',
        author: '',
        publication_date: '',
        subject: ''
    });

    useEffect(() => {
        fetchBooks();
    }, [page, filters]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/book?page=${page}&limit=10`, {
                params: filters
            });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchBooks(); // Trigger search when Enter key is pressed
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
        <div className="container">
            <div className="my-4">
                <h1 className="text-center">Library Management System</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Title"
                            name="title"
                            value={filters.title}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Author"
                            name="author"
                            value={filters.author}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Publication Date"
                            name="publication_date"
                            value={filters.publication_date}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Subject"
                            name="subject"
                            value={filters.subject}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">View Books</h2>
                        </div>
                        <div className="card-body">
                            <table className="table">
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
                            <button className="btn btn-primary" onClick={loadMore}>Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBooks;
