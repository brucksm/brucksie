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
	 	power: [],
		control: [],
		strong: [],
		confident: [],
		first_offer: [],
		AC: []
		},

	end: function() {
	showSlide("finished");
	setTimeout(function() {
			turk.submit(experiment.data)
	}, 1500);
		},
 	show_ins: function() {
			if (cond==0){
				$("#condMessage").html('<font>' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>another buyer has offered you $8 for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you will get $8 for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</font>');
			 }
			if (cond==1){
				$("#condMessage").html('<font color="red">' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>another buyer has offered you $2 for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you will get $2 for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</font>');
			}
			if (cond==2){
				$("#condMessage").html('<font color="blue">' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>nobody else has offered you any money for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you won\'t get any money for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</font>');
			}
		},
		next: function() {
			if (window.self == window.top | turk.workerId.length > 0) {
				// Allow experiment to start if it's a turk worker OR if it's a test run
				//if (window.self == window.top | turk.workerId.length > 0)
				slideNum = slideNum + 1;
				if (slideNum == 2) {
					showSlide("intro");
					experiment.show_ins();
				}
				if (slideNum == 3) {
				showSlide("first_offer");
				experiment.show_ins();
				}
				if (slideNum == 4) {
				showSlide("AC");
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
				experiment.data.first_offer.push(x);
				showSlide("scales");
				$("#testMessage").html('');
			}
		},
	// LOG RESPONSE
		log_response2: function() {

			// Loop through radio buttons
			var text5 = document.getElementById("text5");
			var text14= document.getElementById("text14");
			var text6 = document.getElementById("text6");

			if(text5.checked && text6.checked && text14.checked){
			var go = true;
			}
			if(text1.checked || text2.checked || text3.checked || text4.checked || text7.checked || text8.checked ||text9.checked || text10.checked || text11.checked || text12.checked || text13.checked){
			var go = false;
			}

			if (go) {
				experiment.data.AC.push("pass");
			}
			else {
				experiment.data.AC.push("fail");
			}
			experiment.end();
		},

		log_response: function() {
			var response_logged = false;
			var response_logged1 = false;
			var response_logged2 = false;
			var response_logged3 = false;

			//Array of radio buttons
			var radio1 = document.getElementsByName("power");
			var radio2 = document.getElementsByName("power1");
			var radio3 = document.getElementsByName("power2");
			var radio4 = document.getElementsByName("power3");

			// Loop through radio buttons
			for (i = 0; i < radio1.length; i++) {
				if (radio1[i].checked) {
				experiment.data.power.push(radio1[i].value);
				response_logged = true;
			}
		}
			for (i = 0; i < radio2.length; i++) {
				if (radio2[i].checked) {
					experiment.data.control.push(radio2[i].value);
					response_logged1 = true;
				}
			}
			for (i = 0; i < radio3.length; i++) {
				if (radio3[i].checked) {
					experiment.data.strong.push(radio3[i].value);
					response_logged2 = true;
				}
			}
			for (i = 0; i < radio4.length; i++) {
				if (radio3[i].checked) {
					experiment.data.confident.push(radio4[i].value);
					response_logged3 = true;
				}
			}
			if (response_logged && response_logged1 && response_logged2 && response_logged3) {
				experiment.next();
			}
			else{
				$("#testMessage").html('<font color="red">' +
					 'Please make a response!' +
					 '</font>');
			}
		},
}
