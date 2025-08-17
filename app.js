//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config();

const homeStartingContent = "Discover a world of insights, stories, and experiences. Our blog is dedicated to sharing thought-provoking articles, personal reflections, and useful tips that inspire and inform. Whether you’re looking for lifestyle advice, travel tips, or the latest in technology, you’ll find something to spark your interest here.";
const aboutContent = "At this website, we believe in the power of storytelling. Our mission is to create a platform where voices can be heard and ideas can flourish. Founded in [Year], our blog has grown from a personal diary into a community-driven space filled with diverse content.Our team consists of passionate writers and creators who are committed to delivering high-quality articles that resonate with our audience. We cover a range of topics, including lifestyle, travel, health, and technology, all aimed at enhancing your daily life.";
const contactContent = "We love hearing from our readers! Whether you have a question, suggestion, or just want to say hello, feel free to reach out to us.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started successfully");
});
