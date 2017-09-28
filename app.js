const express = require('express');
const exphbs  = require('express-handlebars');
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
require('./models/Idea');
const Note = mongoose.model('notes');

/* How middleware works
app.use(function (res, req, next) {
  //console.log(Date.now());
  req.name = 'Joseph Alfredo';
  next();
});
*/

// Handlebars middleware
// by default use view directory
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

// new Notes
app.get('/notes/new', (req,res)=>{
  res.render('notes/new');
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
