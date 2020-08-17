//jshint esversion:6
const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

router.get("/compose", function(req, res){
res.render("compose");
});



router.get("/edit/:id", function(req, res){
    const edit = req.params.id;
    Post.find({_id: edit}, function(err, posts){
        if(err){
            res.send(err);
        }else{
            if(posts)
            res.render("edit", {posts: posts});
        }
       
    });
});

//delete post
router.get("/delete/:id", function(req, res){
    const edit = req.params.id;

    Post.deleteOne({_id: edit}, function(err){
        if(err){
            res.send(err);
        }else{
            res.redirect("/");
        }
       
    });  
});







module.exports = router;