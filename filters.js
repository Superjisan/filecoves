module.exports = function(swig) {
  var profilephotos = function (friend) {
  	return "<img src='http://graph.facebook.com/" + friend + "/picture'>";
  };

	profilephotos.safe = true;

  swig.setFilter('profilephotos', profilephotos);
};