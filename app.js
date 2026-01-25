//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OpenRouter } = require("@openrouter/sdk");
const cookieParser = require("cookie-parser");
const Post = require("./models/Post");
const User = require("./models/User");
const authMiddleware = require("./middleware/auth");


const openrouter = new OpenRouter({
  apiKey: process.env.OPENAI_API_KEY,
});


const homeStartingContent = "Discover a world of insights, stories, and experiences. Our blog is dedicated to sharing thought-provoking articles, personal reflections, and useful tips that inspire and inform. Whether you’re looking for lifestyle advice, travel tips, or the latest in technology, you’ll find something to spark your interest here.";
const aboutContent = "At this website, we believe in the power of storytelling. Our mission is to create a platform where voices can be heard and ideas can flourish. Founded in [Year], our blog has grown from a personal diary into a community-driven space filled with diverse content.Our team consists of passionate writers and creators who are committed to delivering high-quality articles that resonate with our audience. We cover a range of topics, including lifestyle, travel, health, and technology, all aimed at enhancing your daily life.";
const contactContent = "We love hearing from our readers! Whether you have a question, suggestion, or just want to say hello, feel free to reach out to us.";

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.cookies.token;
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.redirect("/login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.redirect("/login");

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "my_super_secret_key_123",
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true
  });

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});


app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", authMiddleware, function(req, res){
  res.render("compose");
});

app.post("/compose", authMiddleware, function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.user.userId
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
      postId: post._id,
      title: post.title,
      content: post.content
    });
  });

});

app.post("/chat/:postId", async (req, res) => {
  const { message } = req.body;
  const blog = await Post.findById(req.params.postId);

  if (!blog) {
    return res.json({ reply: "Blog not found." });
  }

const prompt = `
You are a blog assistant.

Allowed actions:
- Summarize the blog
- Explain the blog in your own words
- Answer questions whose answers can be derived from the blog content

Rules:
- Use ONLY the information present in the blog
- Do NOT add outside knowledge

If the user asks something that cannot be answered or derived from the blog, reply exactly:
"This blog does not mention that."

Blog Title:
${blog.title}

Blog Content:
${blog.content.slice(0, 4000)}

User Question:
${message}
`;

  try {
    const completion = await openrouter.chat.send({
    model: "openai/gpt-oss-120b:free",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
  } catch (error) {
  console.error("OpenRouter error:");
  console.error(error.response?.data || error.message);

  res.json({
    reply: "AI service failed. Try again in a moment."
  });
}

});

app.get("/posts/:postId/edit", authMiddleware, async function(req, res) {
  const requestedPostId = req.params.postId;

  const post = await Post.findById(requestedPostId);
  if (!post) {
    return res.redirect("/");
  }

  if (post.author.toString() !== req.user.userId) {
    return res.status(403).send("Not authorized to edit this post");
  }

  res.render("edit", {
    postId: post._id,
    title: post.title,
    content: post.content
  });
});


app.post("/posts/:postId/edit", authMiddleware, async function(req, res) {
  const requestedPostId = req.params.postId;

  const post = await Post.findById(requestedPostId);
  if (!post) {
    return res.redirect("/");
  }

  if (post.author.toString() !== req.user.userId) {
    return res.status(403).send("Not authorized to update this post");
  }

  post.title = req.body.postTitle;
  post.content = req.body.postBody;
  await post.save();

  res.redirect("/posts/" + post._id);
});



app.post("/posts/:postId/delete", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (post.author.toString() !== req.user.userId) {
    return res.status(403).send("Not authorized");
  }

  await Post.findByIdAndDelete(req.params.postId);
  res.redirect("/");
});



app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
