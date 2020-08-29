//jshint esversion:6
const express = require("express");
const Post = require("../models/posts");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/compose", ensureAuthenticated, function (req, res) {
    res.render("compose", { currentUser: req.user });
});



router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;
    Post.find({ _id: edit }, function (err, posts) {
        if (err) {
            res.send(err);
        } else {
            if (posts)
                res.render("edit", { posts: posts, currentUser: req.user});
        }

    });
});

//delete post
router.get("/delete/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;

    Post.deleteOne({ _id: edit }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }

    });
});







module.exports = router;