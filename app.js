const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Load Routes
const notes = require('./routes/notes');
const users = require('./routes/users');



// connect to
// Depraction warning sol: by map global Promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/n-taker-dev',{
  useMongoClient: true
})
.then(()=> console.log('Mongodb connected ...'))
.catch(err => console.log(err));



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

// Static folder
app.use(express.static(path.join(__dirname,'public')));

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


// Use Route
app.use('/notes',notes);
app.use('/users',users);



const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
