const express = require("express");
const books = require("./data/books");

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Route to get a single book by ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Route to add a new book
app.post("/api/books", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Route to update an existing book
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

// Route to delete a book
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
