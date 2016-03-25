var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var voterSchema = new Schema ({
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
  dob: Number,
  tnumber: Number,
  party: String,
  rore: String,
  sign: String,
  dateAdded : { type: Date, default: Date.now },
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Person',voterSchema);