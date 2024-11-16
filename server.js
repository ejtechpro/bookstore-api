const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const conn = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
conn();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.set("views", path.join(__dirname, "views"));


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
  res.render("index", { title: "API" });
});
app.get("/docs", (req, res) => {
  res.render("docs", { title: "Docs" });
});
app.get("/apiv", (req, res) => {
  res.render("apiv", { title: "Api v1" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/*", (req, res) => {
  res.render("404", { title: "404" });
});

app.listen(PORT, () => console.log(`Server running...`));
