var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var cors = require('cors');


//database
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.dbConnectionString, {
    useNewUrlParser: true
}).then(() => console.log('Connect database is success!'))

//setup model
global.User = require('./models/user');


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init passport
app.use(passport.initialize())
require('./passport')
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//middleware route
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

module.exports = app;
