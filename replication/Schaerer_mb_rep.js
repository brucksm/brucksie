// ############################## Helper functions ##############################

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}


// Show the instructions slide -- this is what we want subjects to see first.

// Get random integers.
// returns either 0 or 1
function random() {
		var cond = Math.floor(Math.random()*3);
		return cond;
}

// START
var slideNum = 1;
var cond = random();
showSlide("instructions");

var experiment = {

    // The object to be submitted.
  data: {
	 	rating1: [],
		rating2: [],
		rating3: [],
		first_offer: [],
		},

	end: function() {
	showSlide("finished");
	setTimeout(function() {
			turk.submit(experiment.data)
	}, 1500);
		},

		next: function() {
			if (window.self == window.top | turk.workerId.length > 0) {
			// Allow experiment to start if it's a turk worker OR if it's a test run
			//if (window.self == window.top | turk.workerId.length > 0)
			slideNum = slideNum + 1;
			if (slideNum == 2 && cond == 1) {
				showSlide("no");
			}
			if (slideNum == 2 && cond == 0) {
				showSlide("weak");
			}
			if (slideNum == 2 && cond == 2) {
				showSlide("strong");
			}
			if (slideNum == 3) {
				showSlide("first_offer");
			}
		}
		},
		submit_comments: function() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
			$("#testMessage").html('<font color="red">' +
					 'Please make a response!' +
					 '</font>');
    }
		else{
		experiment.data.first_offer.push(document.forms["myForm"]["fname"].value);
			showSlide("scales");
			
		}
		},
	// LOG RESPONSE
log_response: function() {
var response_logged = false;
var response_logged1 = false;
var response_logged2 = false;

//Array of radio buttons
var radio1 = document.getElementsByName("power");
var radio2 = document.getElementsByName("power1");
var radio3 = document.getElementsByName("power2");

// Loop through radio buttons
for (i = 0; i < radio1.length; i++) {
		if (radio1[i].checked) {
	experiment.data.rating1.push(radio1[i].value);
	response_logged = true;
		}
}
for (i = 0; i < radio2.length; i++) {
		if (radio2[i].checked) {
	experiment.data.rating2.push(radio2[i].value);
	response_logged1 = true;
		}
}
for (i = 0; i < radio3.length; i++) {
		if (radio3[i].checked) {
	experiment.data.rating3.push(radio3[i].value);
	response_logged2 = true;
		}
}

if (response_logged && response_logged1 && response_logged2) {
		experiment.end();
}
else{
	$("#testMessage1").html('<font color="red">' +
			 'Please make a response!' +
			 '</font>');
}
	},
}
