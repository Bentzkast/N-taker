module.exports = {
  ensureAuthenticated: function (req, res, next){
    if(req.isAuthenticated()){ // passport
      return next();
    }
    req.flash('error_msg', 'Woah there!');
    res.redirect('/users/login');
  }
};
