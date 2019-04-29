// RSVP submissions
let rsvp_form = document.querySelector('form[name="rsvp"]');

function rsvp_send() {
	var request = new XMLHttpRequest();
	request.open('POST', rsvp_form.action, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(JSON.stringify(new FormData(rsvp_form)));
}

rsvp_form.onsubmit = function() {
	rsvp_send();
	return false;
};