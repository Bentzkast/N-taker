const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');


require('../models/User');
const User = mongoose.model('users');

//-----------------------------------------------------------------
// GET

// Login Route
router.get('/login', (req,res) => {
  res.render('users/login');
});

// Register Route
router.get('/register', (req,res) => {
  res.render('users/register');
});

// logout router
router.get('/logout', (req, res) =>{
  req.logout();
  req.flash('success_msg', 'logged out :)');
  res.redirect('/users/login');
});


//-----------------------------------------------------------------

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


router.post('/register', (req,res)=>{
  // some basic input validation for password
  let errors = [];
  if(req.body.password !== req.body.password2){
    errors.push({text: "The password doesn't match!"});
  }

  if(req.body.password.length < 4){
    console.log("pushed");
    errors.push({text: "Password must at least be 4 characters!"});
  }

  if(errors.length > 0){
    res.render('users/register',{
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  }else{
    // ascynchronous need to make sure
    // call back calls are called NOT top to bottom,
    // to make sure always use nesting
    User.findOne({email: req.body.email})
    .then((user) =>{
      if(user){
        req.flash('error_msg', 'Email already taken!');
        res.redirect('/users/register');
      }
      else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
          // encryption the password (ascynchronous)
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err){
              throw err;
            }
            newUser.password = hash;
            newUser.save()
              .then(()=>{
                req.flash('success_msg', 'Registed! now you can login');
                res.redirect('/users/login');
              })
              .catch(err =>{
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

module.exports = router;
