var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var voterSchema = new Schema ({
  citizenYes: Boolean,
  citizenNo: Boolean, 
  ofageYes: Boolean,
  ofageNo: Boolean,
  lastname: String,
  firstname: String,
  middlename: String,
  haddress: String,
  hapt: String,
  hcity: String,
  hstate: String,
  hzcode: String,
  maddress: String,
  mapt: String,
  mcity: String,
  mstate: String,
  mzcode: String,
  dob: String,
  idnumber: String,
  tnumber: String,
  party: String,
  rore: String,
  dateAdded : { type: Date, default: Date.now }

});

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Voter',voterSchema);