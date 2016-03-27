var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nameSchema = new Schema ({
  citizen: Boolean,
  ofage: Boolean,
  lastname: String,
  firstname: String,
  middlename: String,
  haddress: String,
  hapt: String,
  hcity: String,
  hstate: String,
  hzcode: Number,
  maddress: String,
  mapt: String,
  mcity: String,
  mstate: String,
  mzcode: Number,
  dob: Number,
  tnumber: Number,
  party: String,
  rore: String,
  sign: String,
  dateAdded : { type: Date, default: Date.now },
  plastname: String,
  pfirstname: String,
  pmiddlename: String,
})

module.exports = mongoose.model('Updatename', nameSchema);