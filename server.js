const express = require("express");
const conn = require("./config/db");
const Book = require("./models/Book");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(express.json());

async function run() {
  const book = new Book({ name: "book 1" });
  // await book.save();
  console.log(book);
}
run();

// // Route to get all Book
// app.get("/api/Book", (req, res) => {
//   res.json(Book);
// });

// // Route to get a single book by ID
// app.get("/api/Book/:id", (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const book = Book.find((b) => b.id === bookId);

//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

// // Route to add a new book
// app.post("/api/Book", (req, res) => {
//   const newBook = req.body;
//   newBook.id = Book.length + 1;
//   Book.push(newBook);
//   res.status(201).json(newBook);
// });

// // Route to update an existing book
// app.put("/api/Book/:id", (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const bookIndex = Book.findIndex((b) => b.id === bookId);

//   if (bookIndex !== -1) {
//     const updatedBook = { ...Book[bookIndex], ...req.body };
//     Book[bookIndex] = updatedBook;
//     res.json(updatedBook);
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

// // Route to delete a book
// app.delete("/api/Book/:id", (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const bookIndex = Book.findIndex((b) => b.id === bookId);

//   if (bookIndex !== -1) {
//     Book.splice(bookIndex, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
