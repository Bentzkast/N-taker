const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// connect to
// Depraction warning sol: by map global Promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/n-taker-dev',{
  useMongoClient: true
})
.then(()=> console.log('Mongodb connected ...'))
.catch(err => console.log(err));

// load Note model
require('./models/Note');
const Note = mongoose.model('notes');

/* How middleware works
app.use(function (res, req, next) {
  //console.log(Date.now());
  req.name = 'Joseph Alfredo';
  next();
});
*/

// by default use view directory
// Handlebars middleware
//-----------------------------------------------------------------
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method-override middleware
app.use(methodOverride('_method'));

//express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

//Global variable
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // call next piece of middleware( asynchronous)
  next();
});
//-----------------------------------------------------------------

// Index Route
app.get('/',(req,res)=>{
  const title = 'Welcome';
  res.render('index', {
    'title': title
  });
});

// About Route
app.get('/about',(req,res)=>{
  res.render('about');
});

// notes
app.get('/notes',(req, res)=>{
  Note.find({})
  .sort({date:'desc'})
  .then(notes => {
    res.render('notes/index', {notes: notes});
  });
});

// New Notes
app.get('/notes/new', (req,res)=>{
  res.render('notes/new');
});

// Edit Notes
app.get('/notes/edit/:id', (req,res)=>{
  Note.findOne({
    _id: req.params.id
  })
  .then(notes => {
    res.render('notes/edit', {notes: notes});
  });
});

// process Form
// Form validation
app.post('/notes', (req,res)=>{
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
app.put('/notes/:id', (req,res) =>{
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

app.delete('/notes/:id', (req,res) =>{
  Note.remove({_id: req.params.id})
  .then(() => {
    req.flash('success_msg','Note removed');
    res.redirect('/notes');
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
