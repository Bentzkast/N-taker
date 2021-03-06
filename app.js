const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Load Routes form other file
const notes = require('./routes/notes');
const users = require('./routes/users');

// passort config
require('./config/passport')(passport);

//-----------------------------------------------------------------
const db = require('./config/database');

// connect to
// Depraction warning sol: by map global Promise
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
    useMongoClient: true
  })
  .then(() => console.log('Mongodb connected ...'))
  .catch(err => console.log(err));

// by default use view directory
// Handlebars middleware
//-----------------------------------------------------------------
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//method-override middleware
app.use(methodOverride('_method'));

//express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport middleware need to be after session
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variable
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  // call next piece of middleware( asynchronous)
  next();
});
//-----------------------------------------------------------------

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    'title': title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});


// Use Route assigned before
app.use('/notes', notes);
app.use('/users', users);


// use specified port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
