const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const conn = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

//Prevent api access
// app.use("/api", (req, res, next) => {
//   const referer = req.get("referer") || "";
//   if (!referer.startsWith(process.env.HOST + ":" + PORT)) {
//     return res.redirect("/");
//   }
//   next();
// });

//Api Routes
app.use("/api/v1/books", require("./routes/book"));

//Pages Routes
app.get("/", (req, res) => {
  res.render("layout", { page: "index", title: "API" });
});
app.get("/docs", (req, res) => {
  res.render("layout", { page: "docs", title: "Docs" });
});
app.get("/apiv", (req, res) => {
  res.render("layout", { page: "apiv", title: "Api v1" });
});
app.get("/about", (req, res) => {
  res.render("layout", { page: "about", title: "About" });
});
app.get("*", (req, res) => {
  res.render("layout", { page: "404", title: "404" });
});

app.listen(PORT, () => console.log(`Server running...`));
