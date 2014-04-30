var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FiltersSchema = new Schema ({
  filter_options: [],
  select_value: String,
  input_values : String,
})

var urlsSchema = new Schema({
  url : String,
  uploader_email : String,
  secure_word: String,
  uploader_name: String,
  extra_security_code : String
})

var FilesSchema = new Schema({
  file_name: String,
  user_name: String,
  time_uploaded: Date
})

var UsersSchema = new Schema({
  name : {type: String, required: true},
  dropbox : {},
  dropbox_id : String,
  dropbox_accesstoken : String,
  filter_categories : [FiltersSchema],
  urls_generated : [urlsSchema],
  email : String,
  file_history : [FilesSchema],
  roles : []
})

var User = mongoose.model('User', UsersSchema)

module.exports = {"User": User}
