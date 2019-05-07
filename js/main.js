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
	let rsvp_form_container = document.querySelector('.rsvp-form-container');

	// Create container
	let container = document.createElement('div');
	container.classList.add('rsvp-form-container');

	// Container content (message)
	let msg = document.createElement('p');
	msg.classList.add('rsvp-msg');

	// Set message
	if($status === 200) {
		msg.innerHTML = 'It\'s all good!\n\nLooks like your RSVP\'s come through, but to be safe just double check your emails (including junk) to make sure you have a copy. If not, email us manually on the address below.';
		msg.classList.add('success');
	} else if ($status === 123) {
		msg.innerHTML = '<picture><source srcset="img/sending.webp" type="image/webp"><source srcset="img/sending.gif" type="image/jpeg"><img src="img/sending.gif" /></picture>Sending by carrier pigeon...';
	} else {
		msg.innerHTML = 'Oops! Something went wrong. Could you do us a favour and email us manually on the address below to let us know you\'re coming?';
		msg.classList.add('fail');
	}

	// Insert msg into container
	container.appendChild(msg);

	// Update form message
	rsvp_form_container.parentElement.replaceChild(container, rsvp_form_container);
}

rsvp_form.onsubmit = function () {
	// Update form with sending message
	rsvp_form_update(123);

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