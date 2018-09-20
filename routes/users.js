var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* Database connection config */
const options = {
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect('mongodb://localhost:27017/learning_mongo', options);

/* GET users listing. */
router.get('/', function (req, res, next) {
	let User = require('./../models/user.model')

	let query = User.find();

	query.exec()
		.then(function (docs) {
			res.render('users', {
				title: 'Users List',
				data: docs
			});
		})
		.catch(function (err) {
			console.err(err)
		})
});

module.exports = router;
