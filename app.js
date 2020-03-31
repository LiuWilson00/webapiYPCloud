var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ExpressPeerServer } = require('peer');
var app = express();


//peer start

const server = app.listen(9000);

// var options = {
//   //webrtc要求SSL安全傳輸,所以要設定證書
//   key: fs.readFileSync('key/server.key'),
//   cert: fs.readFileSync('key/server.crt')
// }


const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp',
  // ssl: options
});

app.use('/peer', peerServer);

peerServer.on('connection', (id) => {
  console.log(`A client connected : ${id}`);
})

peerServer.on('disconnect', (id) => {
  console.log(`A client say ~ bye bye : ${id}`);
});


//peer end


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
