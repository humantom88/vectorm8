require('dotenv').config();
//var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const passport = require('passport');
const methodOverride = require('method-override');
const FileStore = require('session-file-store')(session);
const User = require('./models/User');

require('./config/passport')(passport);


const db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(db, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));


const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

<<<<<<< HEAD
=======
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const products = require('./routes/products');
>>>>>>> origin/dev_product-pages

var app = express();
app.use(bodyParser.json());

app.use(methodOverride('_method'));

//express sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new FileStore(),
    cookie: {
        path: '/admin',
        httpOnly: true,
        maxAge: 3600000,
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/admin', adminRouter);
=======
//app.use('/users', usersRouter);
//app.use('/mailer', mailRouter);
app.use('/products', products);
>>>>>>> origin/dev_product-pages

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;