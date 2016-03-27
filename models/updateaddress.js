var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var addressSchema = new Schema ({
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
  paddress: String,
  papt: String,
  pcity: String,
  pstate: String,
  pzcode: Number,
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Updateaddress', addressSchema);