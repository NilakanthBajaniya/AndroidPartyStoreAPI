require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
require("./model/db");

const apiRouter = require("./routes/userRoutes");
const apiInvtRouter = require("./routes/inventoryRoutes");
const loginRouter = require('./routes/loginRoutes');
const { isRegExp } = require('util');

var app = express();

app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());



//access other end points of api
app.use((req, res, next) => {

  const authHeader = req.headers['authorization'];
  const refreshToken = req.headers['x-refresh-token'];
  const token = authHeader && authHeader.split(" ")[1]

  if (req.url === "/login/user") next();
  else if (token == null) return res.sendStatus(401);
  else {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

      if (error) {

        return res.sendStatus(403)
      }

      req.user = user;
      next();
    });
  } 
});

//login user
app.use('/login', loginRouter);

app.use("/api/users", apiRouter);
app.use("/api/inventories", apiInvtRouter);
app.use(cors());

app.set('view engine', 'jade');


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
