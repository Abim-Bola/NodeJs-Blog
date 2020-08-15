//jshint esversion:6
const express = require("express");
const router = express.Router();
const Post = require("../models/posts");

router.get("/", function(req, res){
Post.find({}, function(err, posts){
res.render("index", { posts: posts});
});
});

module.exports = router;