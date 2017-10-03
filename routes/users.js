const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Login Route
router.get('/login', (req,res) => {
  res.render('users/login');
});

// Register Route
router.get('/register', (req,res) => {
  res.render('users/register');
});

router.post('/register', (req,res)=>{
  res.send('register');
  console.log(req.body);
});

module.exports = router;
