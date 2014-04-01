
/*
 * GET home page.
 */

var fs = require('fs');
var path = require('path');
var client = require('../client');
var showError = require('../client');
var graph = require('fbgraph');

exports.index = function(req, res){

	// get facebook friends
	var secretAccess = "CAADjFMTgIA8BAJJWgosasCNOZCyfnU6ZBIwlenTaj15mVCR9wPJZCcRKxPUxO8NLAahYfcx7LDn2Xs6MPK3MeBbhn5uaK3fCEezPXRn6fZAOShR5mv5XdQUfzh88GDr9AGDII6YPIXXLIXpTvcm9vTj2emRwuuWx7pXjf3q109OIxhiZCZAZBka";

	graph.setAccessToken(secretAccess);

	var friendlist = [];
	var ownerId = '6026602';
	var ownerName = 'Lauren Ashpole';
	graph.get(ownerId + '/friends', function(err, data) {
		for (var key in data) {
			for (var i = 0; i < data[key].length; i++) {
				friendlist.push(data[key][i].id);
			}
		}
	});

	// get dropbox user info
	client.getAccountInfo(function(error, accountInfo) {
		if (error) {
			return showError(error);
		}
		res.render('index', { user: req.user, friendlist: friendlist, ownerId: ownerId, ownerName: ownerName, dropboxName: accountInfo.name });
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
	var newfolder = location + "_" + date;

	fileArray.forEach(function(file){
		var filePath = file.path;

		fileNumber++;
		var rename = file.name.split(".");
		rename[0] = location + "_" + date + "_" + fileNumber.toString();
		file.name = rename.join(".");

		var targetPath = path.resolve('/' + newfolder + '/', file.name);

		// fs.rename(filePath, targetPath, function(err) {
		// 	if (err) throw err;
		// 	console.log("Upload completed!");
		// });

		fs.readFile(filePath, function(error, data) {
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

exports.search = function(req, res) {
	var search_term = req.body.search;

	client.search('/', search_term, function(error, results) {
			res.render('searchresults', { search_term: search_term, results: results });
			console.log(results);
	});
};