const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongodb!");
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = conn;
