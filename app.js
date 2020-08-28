//jshint esversion:6
require('dotenv').config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const multer = require("multer");
const gridfsStorage = require("multer-gridfs-storage");
const path = require("path");
const grid = require("gridfs-stream");
const methodOverride = require("method-override");
const crypto = require("crypto");
const session = require("express-session");
const passport = require("passport");

const app = express();

//passport config
require('./config/passport')(passport);

//db config
const db = require("./config/key").MongoURI;

//connect to mongoose
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("mongo connected"))
.catch(err => console.log(err));


//ejs 
app.use(expressLayout);
app.use(methodOverride('method'));
app.set('view engine', 'ejs');


//body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));


//express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));
  
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global vars for flash
app.use(function(req, res, next){
res.locals.success_msg = req.flash("success_msg");
res.locals.error_msg = req.flash("error_msg");
res.locals.error = req.flash("error");
next();
});

app.use("/", require("./routes/index"));

app.use("/articles", require("./routes/articles"));

app.use("/users", require("./routes/users"));

app.use("/category", require("./routes/category"));

app.use("/manage", require("./routes/manage"));


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("server started on" + " " + PORT));