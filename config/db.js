const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ej:ej12644944@my-db.6kqqq.mongodb.net/?retryWrites=true&w=majority&appName=my-db"
    );
    console.log("Connected to mongodb!");
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = conn;
