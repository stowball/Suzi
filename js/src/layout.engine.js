/*
* Layout Engine v0.5.1
*
* Adds the rendering engine name as a class on the html tag and returns a JavaScript object containing the vendor and version (where appropriate)
*
* Possible vendors: '.vendor-' + 'ie', 'khtml', 'mozilla', 'opera', 'webkit'
* '.vendor-ie' also adds the version: 'vendor-' + 'ie-7', 'ie-8', 'ie-9', 'ie-10'
* '.vendor-opera-mini' is also detected
*
* Copyright (c) 2013 Matt Stow
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
		webkit = 'webkit';
		
		html.className += vendor;
		
		// WebKit
		if ('WebkitAppearance' in style) {
			html.className += webkit;
			if (typeof cssua !== 'undefined') {
				if (cssua.ua.android && !cssua.ua.chrome)
					html.className += ' ua-android-browser';
			}
			
			return {
				vendor: webkit
			}
		}
		// Mozilla
		else if ('MozAppearance' in style) {
			html.className += mozilla;
			return {
				vendor: mozilla
			}
		}
		// IE
		else if ('behavior' in style) {
			html.className += ie + vendor + ie;
			if ('-ms-user-select' in style) {
				html.className += '-10'
				return {
					vendor: ie,
					version: 10
				}
			}
			else if ('fill' in style) {
				html.className += '-9';
				return {
					vendor: ie,
					version: 9
				}
			}
			else if ('widows' in style) {
				html.className += '-8';
				return {
					vendor: ie,
					version: 8
				}
			}
			else {
				html.className += '-7';
				return {
					vendor: ie,
					version: 7
				}
			}
		}
		// Opera
		else if ('OLink' in style) {
			html.className += opera;
			if ('OMiniFold' in style) {
				html.className += vendor + opera + '-mini';
				return {
					vendor: opera,
					version: 'mini'
				}
			}
			else {
				return {
					vendor: opera
				}
			}
		}
		// KHTML
		else if ('KhtmlUserInput' in style) {
			html.className += khtml;
			return {
				vendor: khtml
			}
		}
		else {
			html.className = html.className.replace(vendor, '');
			return false;
		}
})();