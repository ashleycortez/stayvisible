var Phaxio = require('phaxio');

// fill this in with your secret and key
var phaxio = new Phaxio('e2f4f9f1c52fb053a5c57f45921dd292fe6ff1af', '5f8eeb3643cf7ee1efd660e3cdbc88c1e356c8f4');


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