
var mongoose = require('mongoose')
  , async = require('async')
  , User = mongoose.model('User')

/**
 * Clear database
 *
 */

exports.clearDb = function (done) {
  async.parallel([
    function (cb) {
      User.collection.remove(cb)
    }
  ], done)
}
