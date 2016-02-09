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
		},
		submit_comments: function() {
		slideNum = slideNum +1
		experiment.data.first_offer.push(document.getElementById("fo").value);
		if (slideNum == 4) {
			showSlide("scales");
		}
	},
	// LOG RESPONSE
log_response: function() {
var response_logged = false;

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
	response_logged = true;
		}
}
for (i = 0; i < radio3.length; i++) {
		if (radio3[i].checked) {
	experiment.data.rating3.push(radio3[i].value);
	response_logged = true;
		}
}

if (response_logged) {
		experiment.end();
}
	},
}
