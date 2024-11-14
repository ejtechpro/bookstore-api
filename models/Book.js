const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    cover: {
      type: String, // URL or path to the book cover image
    },
    isbn: {
      type: String,
    },
    edition: {
      type: String,
    },
    chaptersNo: {
      type: Number, // Changed to Number for consistency with pages
    },
    pages: {
      type: Number,
    },
    authors: [
      {
        type: String, // Consider creating an Author schema if you want more details per author
      },
    ],
    publisher: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    language: {
      type: String, // e.g., "English", "Spanish"
    },
    format: {
      type: String, // e.g., "Hardcover", "Paperback", "eBook"
    },
    dimensions: {
      height: { type: Number }, // in cm or inches
      width: { type: Number },
      thickness: { type: Number },
    },
    weight: {
      type: Number, // in grams or ounces
    },
    price: {
      type: Number, // Book price in the selected currency
    },
    currency: {
      type: String, // e.g., "USD", "EUR"
    },
    stock: {
      type: Number, // Quantity available in stock
    },
    tags: [
      {
        type: String, // e.g., "Bestseller", "Classic"
      },
    ],
    ratings: {
      average: { type: Number }, // average rating score
      count: { type: Number }, // total number of ratings
    },
    reviews: [
      {
        user: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    description: {
      type: String, // Summary or synopsis of the book
    },
    previewLink: {
      type: String, // URL to preview the book (if available)
    },
    purchaseLinks: [
      {
        vendor: { type: String }, // e.g., "Amazon", "Barnes & Noble"
        url: { type: String }, // Link to the vendor's product page
      },
    ],
    category: {
      type: String, // e.g., "Fiction", "Non-Fiction"
    },
    series: {
      name: { type: String }, // Series name, if part of a series
      order: { type: Number }, // Position in the series
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
