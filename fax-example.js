var Phaxio = require('phaxio');

// fill this in with your secret and key
var cred = require './secrets.js';
var phaxio = new Phaxio(cred.faxclientID, cred.faxclientSecret);


function sendFax(number, message) {
	var faxInfo = {
		to: number,
	  	string_data: message,
	  	string_data_type: 'text'
	};

	phaxio.sendFax(faxInfo, function(err, data){
		if (err) {
			// there was an error! it didn't go through
			console.log(err);
		} else {
			//it worked!!
			console.log(data);
		}
	});
}

sendFax('2129981898', 'hello! this is a test');