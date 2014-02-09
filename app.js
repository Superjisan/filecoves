
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var swig = require('swig');
var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
app.engine('html', swig.renderFile);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.bodyParser({uploadDir:path.join(__dirname, 'uploads')}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/upload', routes.upload);

//FB

var FACEBOOK_APP_ID = "249678341873679";
var FACEBOOK_APP_SECRET = "3689affe76888332a37ee31e8d7e8ffa";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
		console.log("profile:", profile);
		console.log("ACCESS", accessToken);
		console.log("REFRESH:", refreshToken),
		done(null, profile);
	});
}));

app.get('/auth/facebook',
	passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: '/',
	failureRedirect: '/' }));

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

//

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
