const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// load Note model
require('../models/Note');
const Note = mongoose.model('notes');
//-------------------------------------------------

// notes
router.get('/',(req, res)=>{
  Note.find({})
  .sort({date:'desc'})
  .then(notes => {
    res.render('notes/index', {notes: notes});
  });
});

// New Notes
router.get('/new', (req,res)=>{
  res.render('notes/new');
});

// Edit Notes
router.get('/edit/:id', (req,res)=>{
  Note.findOne({
    _id: req.params.id
  })
  .then(notes => {
    res.render('notes/edit', {notes: notes});
  });
});

// process Form
// Form validation
router.post('/', (req,res)=>{
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please enter a title'});
  }
  if(!req.body.detail){
    errors.push({text:'Please add some detail'});
  }

  if(errors.length > 0){
    res.render('/notes/new', {
      errors: errors,
      title: req.body.title,
      detail: req.body.detail
    });
  }else {
    const newUser = {
      title: req.body.title,
      detail: req.body.detail
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
router.put('/:id', (req,res) =>{
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
router.delete('/:id', (req,res) =>{
  Note.remove({_id: req.params.id})
  .then(() => {
    req.flash('success_msg','Note removed');
    res.redirect('/notes');
  });
});

module.exports = router;
