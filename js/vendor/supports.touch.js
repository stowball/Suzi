/*
* Supports Touch v0.1.1
*
* Detects touch support and adds appropriate classes to html and returns a JS object
*
* Copyright (c) 2014 Izilla Partners Pty Ltd
*
* http://www.izilla.com.au
*
* Licensed under the MIT license
*/
;var supports = (function() {
	var html = document.documentElement,
		touch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	
	if (touch) {
		html.className += ' has-touch';
		return {
			touch: true
		}
	}
	else {
		html.className += ' no-touch';
		return {
			touch: false
		}
	}
})();