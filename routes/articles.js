//jshint esversion:6
const express = require("express");
const router = express.Router();
const manage = require("../routes/manage");

//model

const Post = require("../models/posts");

// router.get("/compose", function(req, res){
//     res.render("compose");
//     });

router.post("/compose", function(req, res){
   const {title, content} = req.body;
  let errors = [];

    if(!title || !content){
        errors.push({msg: "Please fill all fields"});
    }

    if(content){
    if(content.length > 1000){
        errors.push({msg: "Post is longer than 1000 characters"});
    }
}

    if(errors.length > 0){
        res.render("compose", {errors, title, 
            content});
    } else {

      const post = new Post ({
          title,
          content
        });

     post.save(function(err){
         if(err){
             console.log(err);
         } else {
             console.log("saved");
             errors.push({msg: "Blog post saved"});
             res.render("compose", {errors, title, content} );
            //  res.redirect("/manage/compose");
         }
        });
    }

});











module.exports=router;