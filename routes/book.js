const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Create a new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all books with optional query string parameters (e.g., q, limit, offset)
router.get("/", async (req, res) => {
  try {
    const { q, limit, offset } = req.query;

    // Construct the query object
    const query = {};

    if (q) {
      // Use $or to search in multiple fields (e.g., title, genre, author, isbn)
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
        { publisher: { $regex: q, $options: "i" } },
      ];
    }

    // Convert limit and offset to numbers (with default values)
    const limitValue = parseInt(limit) || 10; // Default limit is 10
    const offsetValue = parseInt(offset) || 0; // Default offset is 0

    // Find books based on the query and pagination
    const books = await Book.find(query)
      .skip(offsetValue) // Apply the offset (pagination)
      .limit(limitValue); // Apply the limit (pagination)

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const { q } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
        { publisher: { $regex: q, $options: "i" } },
      ];
    }

    const count = await Book.countDocuments(query);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Get the fields to update from the request body

    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.head("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send(); // No body content for HEAD request, just status code
    }

    res.status(200).send(); // Send only headers (no body)
  } catch (err) {
    res.status(500).send();
  }
});

router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); // List allowed methods
  res
    .status(200)
    .send({ Allowed_Headers: "GET, POST, PUT, DELETE, PATCH, OPTIONS" });
});

router.propfind("/", (req, res) => {
  // This would return the properties of books in a specific format (e.g., XML)
  res.set("Content-Type", "application/xml");
  res.status(207).send("<properties>...</properties>");
});

router.purge("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Implement cache clearing logic here (e.g., Redis, in-memory cache)
    clearBookCache(id); // Placeholder function for cache clearing

    res.status(200).json({ message: "Cache cleared for book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.all("*", (req, res) => {
  res.status(404).json({ message: "404 - Not Found" });
});


// router.all("/", (req, res, next) => {
//   const method = req.method.toUpperCase();
//   if (method === "PURGE") {
//     // Handle the PURGE request logic
//     res.status(200).json({ message: "Cache purged" });
//   } else {
//     next();
//   }
// });

module.exports = router;
