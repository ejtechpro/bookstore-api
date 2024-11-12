const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Author",
      required: true,
    },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Publisher",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
