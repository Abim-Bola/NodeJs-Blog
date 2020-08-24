//jshint esversion:6
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const User = require("../models/user");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
            //Match User
            User.findOne({ email: email }, function (err, foundUser) {
                if(err) {
                    console.log(err);
                }
                if (!foundUser) {
                    return done(null, false, { message: "Email is not registered"});
                }

                //match password
                bcrypt.compare(password, foundUser.password, function (err, isMatch) {
                     if(err){
                         console.log(err);
                     }
                     if(isMatch){
                         return done(null, user);
                     } else{
                         return done(null, false, {message: "Password incorrect"});
                     }
                });
            });
        })

    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};