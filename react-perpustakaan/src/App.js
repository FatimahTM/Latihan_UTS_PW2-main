import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    judul: '',
    author: '',
    penerbit: '',
    tahun_terbit: '',
    jumlah_halaman: '',
    genre: '',
    sinopsis: '',
  });
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8000/api/bukus')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:8000/api/bukus', newBook)
      .then(response => {
        console.log('Book added:', response.data);
        fetchBooks();
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };
 
  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:8000/api/bukus/${id}`)
      .then(response => {
        console.log('Book deleted:', response.data);
        fetchBooks();
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  const handleUpdateBook = (id) => {
    const updatedBook = { ...selectedBook };
    axios.put(`http://localhost:8000/api/bukus/${id}`, updatedBook)
      .then(response => {
        console.log('Book updated:', response.data);
        fetchBooks();
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  const detailBook = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSelectedBookChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Books List</h1>
      <div className="card p-3 mb-4">
        <h5>Add New Book</h5>
        <div className="mb-3">
          <input
            type="text"
            name="judul"
            className="form-control"
            placeholder="Book Title"
            value={newBook.judul}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="penerbit"
            className="form-control"
            placeholder="Publisher"
            value={newBook.penerbit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="tahun_terbit"
            className="form-control"
            placeholder="Year Published"
            value={newBook.tahun_terbit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="jumlah_halaman"
            className="form-control"
            placeholder="Total Pages"
            value={newBook.jumlah_halaman}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="genre"
            className="form-control"
            placeholder="Genre"
            value={newBook.genre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="sinopsis"
            className="form-control"
            placeholder="Synopsis"
            value={newBook.sinopsis}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddBook} className="btn btn-success">
          Add Book
        </button>
      </div>

      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
            {book.judul}
            <div>
              <button onClick={() => detailBook(book)} className="btn btn-info btn-sm me-2">
                Details
              </button>
              <button onClick={() => handleUpdateBook(book.id)} className="btn btn-primary btn-sm me-2">
                Edit
              </button>
              <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="judul"
                    value={selectedBook.judul}
                    onChange={handleSelectedBookChange}
                  />
                </div>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Publisher:</strong> {selectedBook.penerbit}</p>
                <p><strong>Year Published:</strong> {selectedBook.tahun_terbit}</p>
                <p><strong>Total Pages:</strong> {selectedBook.jumlah_halaman}</p>
                <p><strong>Genre:</strong> {selectedBook.genre}</p>
                <p><strong>Synopsis:</strong> {selectedBook.sinopsis}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleUpdateBook(selectedBook.id)}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
