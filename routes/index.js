//jshint esversion:6
const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const { subscribe } = require("./manage");
const {ensureAuthenticated} = require("../config/auth");

router.get("/", function(req, res){
    
Post.find({}, function(err, posts){
res.render("index", 
{posts: posts, currentUser: req.user}
);
});
});

module.exports = router;