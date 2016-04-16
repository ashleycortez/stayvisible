var counties;  //check

$.getJSON("nycounties.json", getCountyContacts); // check

console.log("hello");

function getCountyContacts(data){
	counties = data.nyCounties;
	for (var i = 0; i<counties.length; i++){
		var name = counties[i].countyName;
		var fax = counties[i].fax;
		var email = counties[i].email;
		var p = "<li id='"+[i]+"''>" + name + "</li>";
		$ ("#countyList").append(p);
	}
	function addListeners(){
		var l = document.getElementsByTagName('li');
		for (var i=0; i< l.length; i++){
			l[i].addEventListener('click', function(event){
				var currentElement = parseInt(event.target.id);
				addCountyInformation(currentElement);
			});			
		};

};
	addListeners();
}

function addCountyInformation(element){
	//console.log(counties[element].fax);
	document.getElementById("fax").innerHTML = counties[element].fax;

}


$("#faxit").click(function(){
	var faxNum = document.getElementById("fax").innerHTML;
	$('#faxywaxy').val(faxNum);
	console.log(faxNum);
	
});







// function init() {
//   renderPeeps();
// }

// function renderForm(){
// 	jQuery.ajax({
// 		url : '/api/get',
// 		dataType : 'json',
// 		success : function(response) {
// 			console.log(response);

// 			var people = response.people;

// 			for(var i=0;i<people.length;i++){
// 				var htmlToAdd = '<div class="col-md-4">'+
// 					'<img src='+people[i].imageUrl+' width="100">'+
// 					'<h1>'+people[i].name+'</h1>'+
// 					'<ul>'+
// 						'<li>Year: '+people[i].itpYear+'</li>'+
// 						'<li>Interests: '+people[i].interests+'</li>'+
// 					'</ul>'+
// 					'<a href="/edit/'+people[i]._id+'">Edit Person</a>'+
// 				'</div>';
			
// 				jQuery("#people-holder").append(htmlToAdd);
// 			}



// 		}
// 	})	
// }

// window.addEventListener('load', init())


