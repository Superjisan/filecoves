
/*
 * GET home page.
 */

var fs = require('fs');
var path = require('path');
var client = require('../client');
var showError = require('../client');
var graph = require('fbgraph');

exports.index = function(req, res){
	var secretAccess = "CAADjFMTgIA8BAJJWgosasCNOZCyfnU6ZBIwlenTaj15mVCR9wPJZCcRKxPUxO8NLAahYfcx7LDn2Xs6MPK3MeBbhn5uaK3fCEezPXRn6fZAOShR5mv5XdQUfzh88GDr9AGDII6YPIXXLIXpTvcm9vTj2emRwuuWx7pXjf3q109OIxhiZCZAZBka";

	graph.setAccessToken(secretAccess);

	var friendlist = [];
	var ownerId = '6026602';
	graph.get(ownerId + '/friends', function(err, data) {
		for (var key in data) {
			for (var i = 0; i < data[key].length; i++) {
				friendlist.push(data[key][i].id);
			}
		}
		res.render('index', { user: req.user, friendlist: friendlist, ownerId: ownerId });
	});

};

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