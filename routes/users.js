//jshint esversion:6
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//model
const User = require("../models/User");


//admin login
router.get("/login", (req, res) => res.render("login"));

//admin register
router.get("/register", (req, res) => res.render("register"));

//registration password validation
router.post("/register", (req, res) => {

    const {fname, lname, email, password} = req.body;
    let errors = [];


    //if empty 
    if(!fname || !lname || !email || !password){
        errors.push({msg: 'Please fill all fields'});
    }
 //pass length
 if(password){
    if(password.length < 6 ){
        errors.push({msg: 'Password should be more than 6 characters'});
    }
  }

   //if there are any errors, return to the register page
    if(errors.length > 0){
     res.render('register', {
         errors,
         fname,
         lname,
         email,
         password
     });

    } else {

  //find the user
        User.findOne({email: email}, function(err, foundUser){

            if(err){
          if(foundUser){
              errors.push({msg: 'Email already registered'});
              res.render("register", {
                errors,
                fname,
                lname,
                email,
                password
            });
        }
    
          } else { 

        const newUser = new User ({
        fname,
        lname,
        email,
        password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

  
module.exports = router;