// RSVP submissions
let rsvp_form = document.querySelector('form[name="rsvp"]');

function rsvp_send($data) {
	var request = new XMLHttpRequest();
	request.open('POST', rsvp_form.action, true);
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	request.onload = function() {
		rsvp_form_update(request.status);
	}

	request.send($data);
}

function rsvp_form_update($status) {
	let msg = document.createElement('p');
	msg.classList.add('rsvp-msg');


	if($status == 200) {
		msg.innerHTML = 'It\'s all good!\n\nLooks like your RSVP\'s come through, but to be safe just double check your emails to make sure you have a copy. If not, email us manually on the address below.';
		msg.classList.add('success');
	} else {
		msg.innerHTML = 'Oops! Something went wrong. Could you do us a favour and email us manually on the address below to let us know you\'re coming?';
		msg.classList.add('fail');
	}

	rsvp_form.parentElement.replaceChild(msg, rsvp_form);
}

rsvp_form.onsubmit = function () {
	let object = {};
	let formData = new FormData(rsvp_form);

	formData.forEach(function (value, key) {
		object[key] = value;
	});

	let json = JSON.stringify(object);

	rsvp_send(json);

	return false;
};

// Disable submit until name and email are filled
let submit = rsvp_form.querySelector('input[type="submit"]');
let name = rsvp_form.querySelector('input[name="name"]');
let email = rsvp_form.querySelector('input[name="email"]');

submit.setAttribute('disabled', 'disabled');

function rsvpValidate() {
	if(name.value !== '' && email.value !== '') {
		submit.removeAttribute('disabled');
	}
}

rsvp_form.onchange = rsvpValidate;
name.onkeypress = rsvpValidate;
email.onkeypress = rsvpValidate;