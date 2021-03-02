//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const homeStartingContent =
  "Hello Everyone, I am Amal Mohan a CSE undergraduate at Government Engineering College Palakkad, Sreekrishnapuram. This is my personal bloging website which is created myself to share my posts."
const aboutContent = "Email ID : amalmohan542@gmail.com"
const contactContent = "Email ID : amalmohan542@gmail.com"

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

var posts = []
app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts })
})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent })
})
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  }
  posts.push(post)
  res.redirect("/")
})

app.get("/posts/:postName", function (req, res) {
  var reqTitle = req.params.postName
  posts.forEach(function (post) {
    if (_.lowerCase(reqTitle) === _.lowerCase(post.title)) {
      res.render("post", { reqTitle: reqTitle, reqBody: post.content })
    }
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000")
})
