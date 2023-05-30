const express = require("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for req
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [];
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
