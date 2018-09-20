var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.render('form', {
		title: 'FormData'
	});
});


module.exports = router;
