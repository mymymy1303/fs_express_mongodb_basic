var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
	var obj;
	fs.readFile('./db/user.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		// Lấy Danh Sách 
		// console.log(obj.lists)
		// var myKeys = Object.keys(obj.lists).filter(key => key == req.params.id);
		res.render('usersdetails', {
			data: obj.lists[req.params.id]
		});
	});
});

module.exports = router;
