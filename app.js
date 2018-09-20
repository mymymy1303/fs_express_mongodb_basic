var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var fs = require('fs');
// Gọi Route
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');
var usersDetailRouter = require('./routes/usersdetails');
var formRouter = require('./routes/form');
// Khởi tạo APP
var app = express();
// Gọi Template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Cấu hình
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'public/css'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: app.get('env') === 'development' ? false : true
}));
app.use(express.static(path.join(__dirname, 'public')));
// Init App
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/users', usersRouter);
app.use('/user', usersDetailRouter);
app.use('/form', formRouter);
// Xử lý lưu file
app.post('/save', function (req, res, next) {
	// console.log(req.body.Username)
	// console.log(req.body.EmailAddress)
	// Viết hàm check trùng username hoặc email
	fs.readFile('./db/user.json', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		} else {
			let dataOld = JSON.parse(data)
			let dataAdd = {}
			dataAdd.user = req.body.Username
			dataAdd.email = req.body.EmailAddress
			dataOld.lists[req.body.Username] = dataAdd
			let dataSave = JSON.stringify(dataOld, null, 4);
			fs.writeFileSync('./db/user.json', dataSave, 'utf8', function (err) {
				if (err) {
					return console.log(err);
				}
			});
		}
	});
	res.redirect('/users')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	if(req.app.get('env') === 'dev') {
		next(createError(404));
	} else{
		res.status(400);
		res.render('404.pug', { title: "404 We're sorry!", desc: "We couldn't find what you're looking for", btn: "» Go back to the main page" });
	}
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
