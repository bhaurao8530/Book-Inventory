import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from "../services/bookService";

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBook = async (book) => {
    try {
      await addBook(book);
      loadBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleUpdateBook = async (book) => {
    try {
      await updateBook(book.id, book);
      setSelectedBook(null);
      loadBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <h2>Book Inventory</h2>

      <BookForm
        onAddBook={handleAddBook}
        onUpdateBook={handleUpdateBook}
        selectedBook={selectedBook}
        clearSelection={() => setSelectedBook(null)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Age</th>
              <th>Published Date</th>
              <th>Publisher</th>
              <th>Overview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td> 
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.email}</td>
                <td>{book.age}</td>
                <td>{book.publishedDate}</td>
                <td>{book.publisher}</td>
                <td>{book.overview}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/books/${book.id}`, { state: { book } })
                    }
                  >
                    View
                  </button>
                  <button onClick={() => setSelectedBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
