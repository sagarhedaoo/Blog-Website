const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
app.use(express.urlencoded({ extended: true }));

//middlewares
app.use(morgan("tiny"));

//monoogse and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });

//   blog
//     .save()
//     .then((results) => {
//       res.send(results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.catch(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("6475f4c169231418ffd01a52")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.catch(err);
//     });
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

//404 page
app.use((req, res) => {
  res.render("404", { title: "404" });
});
