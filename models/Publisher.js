const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publisher", publisherSchema);
