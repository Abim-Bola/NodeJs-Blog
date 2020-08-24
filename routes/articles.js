//jshint esversion:6
const express = require("express");
const router = express.Router();
const manage = require("../routes/manage");
const category = require("../routes/category");

//model
const Post = require("../models/posts");
const { post } = require("../routes/manage");

// router.get("/compose", function(req, res){
//     res.render("compose");
//     });

router.get("/posts", function(req, res){

    Post.find({}, function(err, posts){
         if(err){
             res.send("Uh Oh");
         }else{
             res.render("posts", {posts: posts});
         }
    });
});

router.get("/singlepost/:id", function(req, res){
const id = req.params.id;

Post.find({_id: id}, function(err, posts){
res.render("singlepost", {posts: posts});
});
});


router.post("/compose", function(req, res){
   const {title, content, category } = req.body;
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
            content, category});
    } else {

      const post = new Post ({
          title,
          content,
          category
        });

     post.save(function(err){
         if(err){
             console.log(err);
         } else {
             console.log("saved");
             errors.push({msg: "Blog post saved"});
             res.render("compose", {errors, title, content, category} );
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