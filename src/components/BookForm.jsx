import { useEffect, useState } from "react";

function BookForm({ onAddBook, onUpdateBook, selectedBook, clearSelection }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    age: "",
    publishedDate: "",
    publisher: "",
    overview: ""
  });

  useEffect(() => {
    if (selectedBook) {
      setForm(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!form.title || !form.author || !form.email || !form.age) {
      alert("Title, Author, Email, and Age are required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Invalid email format");
      return;
    }

    if (isNaN(form.age)) {
      alert("Age must be a number");
      return;
    }

    selectedBook ? onUpdateBook(form) : onAddBook(form);

    setForm({
      title: "",
      author: "",
      email: "",
      age: "",
      publishedDate: "",
      publisher: "",
      overview: ""
    });

    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedBook ? "Update Book" : "Add Book"}</h3>

      <input
        name="title"
        placeholder="Book Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="author"
        placeholder="Author Name"
        value={form.author}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Author Age"
        value={form.age}
        onChange={handleChange}
      />
      <input
        name="publishedDate"
        type="date"
        placeholder="Published Date"
        value={form.publishedDate}
        onChange={handleChange}
      />
      <input
        name="publisher"
        placeholder="Publisher"
        value={form.publisher}
        onChange={handleChange}
      />
      <textarea
        name="overview"
        placeholder="Book Overview"
        value={form.overview}
        onChange={handleChange}
      />

      <button type="submit">
        {selectedBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;
