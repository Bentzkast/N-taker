const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const noteSchema = new Schema({
  title :{
    type: String,
    required: true
  },
  note:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});

mongoose.model('notes', noteSchema);
