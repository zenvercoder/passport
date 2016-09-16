var express = require('express');
var router = express.Router();
var passport = require('./passport');
var userModule = require('./users')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  // Don't show login and register to logged in users
  if (req.isAuthenticated())
  {
    res.redirect('/dashboard');
    return;
  }
  res.render('index', { title: 'My Dashboard App' });
});

router.post('/register', function (req, res, next) {
  // Add the user to our data store
  userModule.add(req.body.username, req.body.password)
      .then(function(){
        console.log('user registered');
        res.redirect('/');
      })
      .catch(function(err){
        next(new Error('User could not be created.'));
        return;
      });
});

// This route will authenticate a user and create a session.
// If successful, req.user will exist,
// redirect to /dashboard,
// and req.isAuthenticated() will return true
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/fail'
  })
);

router.get('/logout', function (req, res) {
  // Clear the session and unauthenticate the user
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', function (req, res, next) {
  // Determine if the user is authenticate to view the page
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  // req.user will be the value from deserializeUser
  res.render('dashboard', { user: req.user })
});

module.exports = router;

