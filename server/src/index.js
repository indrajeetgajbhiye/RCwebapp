var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redis = require('redis');
var configDB = require('./config/config.js');


mongoose.Promise = global.Promise;
mongoose.connect(configDB.database.url, {
    useUnifiedTopology: true
}).catch(function(error) {
    console.error('mongo connection fail::', error);
}).then(function(mongodb) {
    console.log('mongo connected');
});

/*
 *logging every details to console
 */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ useNewUrlParser: true }))
app.use(express.static('./public'));
/*
 *set up view engine to jade for templating
 */
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/public'));

// app.use(session({
//     secret: 'secretkey'
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*
 * pass passport for configuration
 */
// require('./api/users/services/passport')(passport);
var userRoutes = require('./users/routes/routes') //importing route
app.use('/', userRoutes);
var contentRoutes = require('./content/routes/routes') //importing route
app.use('/', contentRoutes);

/*
 *starting the server with port number 6056
 */
app.listen(port);
console.log('Server is running on port:' + port);