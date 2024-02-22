import { useState } from 'react';
import axios from 'axios';

function AddBookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newBook = {
                title: title,
                author: author,
                publication_date: publicationDate,
                subject: subject
            };
            axios.post('http://localhost:5000/addbook', newBook);
            
            setTitle('');
            setAuthor('');
            setPublicationDate('');
            setSubject('');
        } catch (error) {
            console.log('Error adding book:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="publicationDate" className="form-label">Publication Date:</label>
                    <input type="date" className="form-control" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject:</label>
                    <input type="text" className="form-control" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
}

export default AddBookForm;
