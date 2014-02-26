var Dropbox = require('dropbox');

// dropbox user app/user info
var client = new Dropbox.Client({
    key: "2n2769ovel9u7lw",
    secret: "ciwy8fasj7f2e23",
    token: "nfBFASuLSxoAAAAAAAAAAYfXtWTZqfBGl3RQUllvob9OHaX3Y3gbNUAXJMPswNrf"
});

// client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

// handle dropbox errors
var showError = function(error) {
	switch (error.status) {
		case Dropbox.ApiError.INVALID_TOKEN:
			console.log("User token expired.");
			break;
		case Dropbox.ApiError.NOT_FOUND:
			console.log("File not found.");
			break;
		case Dropbox.ApiError.OVER_QUOTA:
			console.log("Dropbox is full.");
			break;
		case Dropbox.ApiError.RATE_LIMITED:
			console.log("Too many API requests. Try again later.");
			break;
		case Dropbox.ApiError.NETWORK_ERROR:
			console.log("Network connection error.");
			break;
		case Dropbox.ApiError.INVALID_PARAM:
		case Dropbox.ApiError.OAUTH_ERROR:
		case Dropbox.ApiError.INVALID_METHOD:
		default:
			console.log("Unknown error. Try refreshing the page.");
	}
};

// client.authenticate(function(error, client) {
//   if (error) {
//     return showError(error);
//   }
// 	console.log("Dropbox authenticated");
// 	console.log('token ', client._oauth._token);
//   console.log(client);
// });

client.onError.addListener(function(error) {
  // if (window.console) {  // Skip the "if" in node.js code.
    console.error(error);
  // }
});

// client.getAccountInfo(function(error, accountInfo) {
//   if (error) {
//     return showError(error);
//   }
//   console.log("Hello, " + accountInfo.name + "!");
// });

module.exports = showError;
module.exports = client;