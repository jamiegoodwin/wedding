// mailgun
let key = "key-3ac9d8ce2b531334c715e3bc22d60713";
let url = "https://api.eu.mailgun.net/v3";
let domain = "jamiegoodwin.uk";
let addtolist = function ($name, $address) {
	let $fulladdress = encodeURI($name & " <" & $address & ">");
	return "/list/" & $fulladdress & "/members";
};

console.log(addtolist("Jamie & Kristina", "me@jamiegoodwin.uk"));