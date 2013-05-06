/*
 * Izilla GUP v1.1.2
 * Gets "true" url parameters and adds them as classes to the html tag and to the izilla_gup object
 *
 * eg. article.html?lightbox=true&mqdebug=true
 *
 * Usage CSS: html.param {}
 * Usage JS : izilla_gup.param
 *
 * Copyright (c) 2012 Izilla Partners Pty Ltd
 *
 * http://www.izilla.com.au
 *
 * Licensed under the MIT license
 *
 */
;var izilla_gup = (function() {
	var rx = /(&|\?)(\w+)=true/gi,
		str = window.location.href,
		m,
		s = '',
		gup = {};
	while (m = rx.exec(str)) {
		s += ' ' + m[2];
		gup[m[2]] = true;
	}
	document.documentElement.className += s;
	return gup;
})();