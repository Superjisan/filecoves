
/*
 * GET home page.
 */

var fs = require('fs');
var path = require('path');
var client = require('../client');
var showError = require('../client');

exports.index = function(req, res){
  res.render('index', { user: req.user });
};

exports.account = function(req, res){
  res.render('account', { user: req.user });
};

// exports.login = function(req, res){
//   res.render('login', { user: req.user });
// };

exports.upload = function(req, res){

	if (typeof req.files.file.path !== 'undefined') {
		var fileArray = [req.files.file];
	} else {
		var fileArray = req.files.file;
	}

	var location = req.body.location;
	var date = req.body.date;
	var fileNumber = 0;

	fileArray.forEach(function(file){
		var filePath = file.path;

		fileNumber++;
		var rename = file.name.split(".");
		rename[0] = location + "_" + date + "_" + fileNumber.toString();
		file.name = rename.join(".");

		var targetPath = path.resolve('uploads/', file.name);

		fs.rename(filePath, targetPath, function(err) {
			if (err) throw err;
			console.log("Upload completed!");
		});

		fs.readFile(targetPath, function(error, data) {
			if (error) {
			return showError;
		}

			client.writeFile(targetPath, data, function(error, stat) {
				if (error) {
					return showError(error);
				}
			});
		});
	});

res.redirect('/');
};