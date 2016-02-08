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
		var cond = Math.floor(Math.random()*2);
		return cond;
}

// START
var slideNum = 1;
showSlide("instructions");

var experiment = {

    // The object to be submitted.
   data: {
		 sent: [],
		 rating: [],
		 language: [],
		 children:[],
		 expt_aim: [],
		 expt_gen: [],
	},


		next: function() {
			// Allow experiment to start if it's a turk worker OR if it's a test run
			//if (window.self == window.top | turk.workerId.length > 0)
			slideNum = slideNum + 1;
			if (slideNum == 2) {
				showSlide("One");
			}
			if (slideNum == 3) {
				showSlide("Two");
			}
		},

}



//log_response: function() {
//var response_logged = false;


//if (response_logged) {
//	nextButton.blur();
//}
//
//var cond = 1;
//showSlide("1");
//if cond == 1 {
	//showSlide("instructions");
//}

//if cond == 0 {
	//showSlide("0");
//}
