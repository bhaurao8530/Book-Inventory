import { useLocation, Link } from "react-router-dom";

function BookDetails() {
  const location = useLocation();
  const book = location.state?.book; 

  if (!book) return <p>No book data available</p>;

  return (
    <div className="container">
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Email:</strong> {book.email}</p>
      <p><strong>Age:</strong> {book.age}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Overview:</strong> {book.overview}</p>
      <Link to="/">⬅ Back</Link>
    </div>
  );
}

export default BookDetails;
