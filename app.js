const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connecting to mongoDB and creating new DB todolistDB
mongoose.connect("*******************************mongoDB connection url******************************", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Creating a chema and a model for schema for our post items.
const postsSchema = {
  title: String,
  body: String,
};
const Post = mongoose.model("Post", postsSchema);

const mainPageContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// GET functions ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/", function (req, res) {
  Post.find({}, function (err, foundPosts) {
      res.render("home", {
        posts: foundPosts,
        mainPageContent: mainPageContent,
      });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

//Dynamic EJS get function for different posts
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    const storedPostBody = post.body;
        res.render("post", {
          postTitle: post.title,
          postBody: post.body
        });
  });
});

// POST functions ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

//Listener +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function () {
  console.log("Server started successfully");
});
