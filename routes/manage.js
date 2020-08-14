//jshint esversion:6
const express = require("express");
const router = express.Router();

router.get("/compose", function(req, res){
res.render("compose");
});



router.get("/edit/:id", function(req, res){
    const editPost = req.params.id;
res.render("edit", {title: "Edit Article"});
});







module.exports = router;