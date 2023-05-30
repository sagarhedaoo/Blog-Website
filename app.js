const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//express app
const app = express();

//Mongo Connection
const dbURI =
  "mongodb+srv://shedaoo:Sagar123@blogposts.xe4nxin.mongodb.net/posts";
mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to DB"))
  .then((result) => app.listen(3000))
  .catch((err) => console.log("Error connecting DB"));

//register view engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//middlewares
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  const blogs = [{ title: "Blog1", snippet: "This is Blog 1" }];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

//404 page
app.use((req, res) => {
  res.render("404", { title: "404" });
});
