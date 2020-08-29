//jshint esversion:6
const express = require("express");
const router = express.Router();
const manage = require("../routes/manage");
const category = require("../routes/category");
const { ensureAuthenticated } = require("../config/auth");

//model
const Post = require("../models/posts");
const { post } = require("../routes/manage");



//view all posts
router.get("/posts", function(req, res){

    Post.find({}, function(err, posts){
         if(err){
             res.send("Uh Oh");
         }else{
             res.render("posts", {posts: posts, currentUser: req.user});
         }
    });
});

//view single post
router.get("/singlepost/:id", function(req, res){
const id = req.params.id;

Post.find({_id: id}, function(err, posts){
res.render("singlepost", {posts: posts, currentUser: req.user});
});
});


router.post("/compose", function(req, res){
   const {title, content, category } = req.body;
   const loggedUser = req.user.fname + " " + req.user.lname; 
  let errors = [];

    if(!title || !content || !category){
        errors.push({msg: "Please fill all fields"});
    }

    if(content){
    if(content.length > 2000){
        errors.push({msg: "Post is longer than 1000 characters"});
    }
}

    if(errors.length > 0){
        res.render("compose", {errors, title, 
            content, category, currentUser: req.user});
    } else {

      const post = new Post ({
          title,
          content,
          category,
          name: loggedUser
        });

     post.save(function(err){
         if(err){
             errors.push("Your blog post did not save");
         } else {
             errors.push({msg: "Blog post saved"});
             res.render("compose", {errors, title, content, category, currentUser: req.user} );
            //  res.redirect("/manage/compose");
         }
        });
    }

});

const hello = "hi";



//edit a post
router.post("/edit/:id", function(req, res){
    const edit = req.params.id;
    console.log(req.params.id);
    const {title, content, category } = req.body;

    let errors = [];

    if(!title || !content || !category){
        errors.push({msg: "Please fill all fields"});
    }

    Post.findByIdAndUpdate( {_id: edit}, {
          title,
          content,
          category
        }, { new: true }, function(err){
             if(err){
                 console.log("didnt update");
             }else{
                errors.push({msg: "Blog post editted"});
                 res.render("edit", {errors});
             }
        }

    );
    });











module.exports=router;