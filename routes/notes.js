const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helper/auth');
// pull the function


// load Note model
require('../models/Note');
const Note = mongoose.model('notes');
//-------------------------------------------------

// notes some basicREST api
router.get('/', ensureAuthenticated,(req, res)=>{
  Note.find({user: req.user.id})
  .sort({date:'desc'})
  .then(notes => {
    res.render('notes/index', {notes: notes});
  });
});

// New Notes
router.get('/new', ensureAuthenticated, (req,res)=>{
  res.render('notes/new');
});

// Edit Notes
router.get('/edit/:id', ensureAuthenticated, (req,res)=>{
  Note.findOne({
    _id: req.params.id
  })
  .then(notes => {
    if(notes.user !== req.user.id){
      req.flash('error_msg', 'Hmm thats not yours...');
      res.redirect('/notes');
    }else{
      res.render('notes/edit', {notes: notes});
    }
  });
});

// process Form
// Form validation
router.post('/', ensureAuthenticated, (req,res)=>{
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please enter a title'});
  }
  if(!req.body.detail){
    errors.push({text:'Please add some detail'});
  }

  if(errors.length > 0){
    res.render('notes/new', {
      errors: errors,
      title: req.body.title, // passed back in, so no retyping
      detail: req.body.detail
    });
  }else {
    const newUser = {
      title: req.body.title,
      detail: req.body.detail,
      user: req.user.id // connect it with the current user if
    };
    new Note(newUser)
    .save()
    .then(note =>{
      req.flash('success_msg','Note added');
      res.redirect('/notes');
    });
  }
});

// EDIT handle
router.put('/:id', ensureAuthenticated, (req,res) =>{
  Note.findOne({
    _id: req.params.id
  })
  .then(notes => {
    // update Value
    notes.title = req.body.title;
    notes.detail = req.body.detail;

    notes.save().then(notes => {
      req.flash('success_msg','Note edited');
      res.redirect('/notes');
    });
  });
});

// Delete handle
router.delete('/:id', ensureAuthenticated, (req,res) =>{
  Note.remove({_id: req.params.id})
  .then(() => {
    req.flash('success_msg','Note removed');
    res.redirect('/notes');
  });
});

module.exports = router;
