require('dotenv').config();
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var PORT = process.env.PORT || 3000;

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: [
      'id', 'displayName', 'email', 'gender', 'address', 'birthday', 'age_range', 
      'hometown', 'location', 'link', 'friends', 'likes', 'photos', 'videos', 'posts', 'languages']
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    console.log("hello user /home"); 
    console.log(req.user);    
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  // passport.authenticate('facebook'));
  passport.authenticate('facebook', 
  {authType: 'rerequest', scope: [
    'email', 'user_birthday', "user_age_range", 'user_friends', 'user_likes', 'manage_pages', 'user_gender' , 'public_profile',
    'user_hometown', 'user_location', 'user_link', 'user_photos', 'user_videos', 'user_posts',
    'user_tagged_places', 'instagram_basic', 'user_events'
  ] }
));


app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log("hello user /profile");    
    console.log(req.user);    
    res.render('profile', { user: req.user });
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.listen(PORT, function() {
    console.log("Listening to passport-facebook-express on port " + PORT);
  });
