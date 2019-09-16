var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// database
mongoose.connect('mongodb+srv://user1:1234@cluster0-g03ww.mongodb.net/assignment1?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;

// check connection
db.once('open',() => {
  console.log('Connected to DB');
})

// check for db errors
db.on('error', (err) => {
  console.log(err);
})

// closing connection to DB
const gracefulShutdown = (msg,callback) => {
  db.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
// nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid,'SIGUSR2');
  });
})
// app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
