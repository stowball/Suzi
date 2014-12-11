/*!
* Layout Engine v0.8.3
*
* Adds the rendering engine and browser names as a class on the html tag and returns a JavaScript object containing the vendor, version and browser name (where appropriate)
*
* Possible vendors: '.vendor-' + 'ie', 'khtml', 'mozilla', 'opera', 'webkit'
* '.vendor-ie' also adds the version: 'vendor-' + 'ie-11', 'ie-10', 'ie-9', 'ie-8', 'ie-7'
* '.vendor-opera-mini' is also detected
*
* Possible browsers: '.browser-' + 'android', 'chrome', 'wiiu'
*
* Copyright (c) 2014 Matt Stow
*
* http://mattstow.com
*
* Licensed under the MIT license
*/
;var layoutEngine = (function() {
	var html = document.documentElement,
		style = html.style,
		vendor = ' vendor-',
		ie = 'ie',
		khtml = 'khtml',
		mozilla = 'mozilla',
		opera = 'opera',
		webkit = 'webkit',
		browser = ' browser-',
		android = 'android',
		chrome = 'chrome',
		wiiu = 'wiiu',
		cssClass = vendor,
		jsObject;
	
	// IE
	if ('-ms-scroll-limit' in style || 'behavior' in style) {
		cssClass += ie + vendor + ie;
		if ('-ms-ime-align' in style) {
			cssClass += '-11'
			jsObject = {
				vendor: ie,
				version: 11
			}
		}
		else if ('-ms-user-select' in style) {
			cssClass += '-10'
			jsObject = {
				vendor: ie,
				version: 10
			}
		}
		else if ('fill' in style) {
			cssClass += '-9';
			jsObject = {
				vendor: ie,
				version: 9
			}
		}
		else if ('widows' in style) {
			cssClass += '-8';
			jsObject = {
				vendor: ie,
				version: 8
			}
		}
		else {
			cssClass += '-7';
			jsObject = {
				vendor: ie,
				version: 7
			}
		}
	}
	// WebKit
	else if ('WebkitAppearance' in style) {
		cssClass += webkit;
		var ua = navigator.userAgent;

		if (ua.indexOf('Android') >= 0 && ua.indexOf('Chrome') === -1) {
			cssClass += browser + android;
			jsObject = {
				vendor: webkit,
				browser: android
			}
		}
		else if (!!window.chrome || ua.indexOf('OPR') >= 0) {
			cssClass += browser + chrome;
			jsObject = {
				vendor: webkit,
				browser: chrome
			}
		}
		else if (!!window.wiiu) {
			cssClass += browser + wiiu;
			jsObject = {
				vendor: webkit,
				browser: wiiu
			}
		}
		else {
			jsObject = {
				vendor: webkit
			}
		}
	}
	// Mozilla
	else if ('MozAppearance' in style) {
		cssClass += mozilla;
		jsObject = {
			vendor: mozilla
		}
	}
	// Opera
	else if ('OLink' in style || !!window.opera) {
		cssClass += opera;
		if ('OMiniFold' in style) {
			cssClass += '-mini';
			jsObject = {
				vendor: opera,
				version: 'mini'
			}
		}
		else {
			jsObject = {
				vendor: opera
			}
		}
	}
	// KHTML
	else if ('KhtmlUserInput' in style) {
		cssClass += khtml;
		jsObject = {
			vendor: khtml
		}
	}
	else {
		return false;
	}
	
	html.className += cssClass;
	
	return jsObject;
})();