/*!
* Layout Engine v0.8.1
*
* Adds the rendering engine and browser names as a class on the html tag and returns a JavaScript object containing the vendor, version and browser name (where appropriate)
*
* Possible vendors: '.vendor-' + 'ie', 'khtml', 'mozilla', 'opera', 'webkit'
* '.vendor-ie' also adds the version: 'vendor-' + 'ie-11', 'ie-10', 'ie-9', 'ie-8', 'ie-7'
* '.vendor-opera-mini' is also detected
*
* Possible browsers: '.browser-' + 'android', 'chrome', 'wiiu'
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
		webkit = 'webkit',
		browser = ' browser-',
		android = 'android',
		chrome = 'chrome',
		wiiu = 'wiiu',
		cssClass = vendor;
		
		// WebKit
		if ('WebkitAppearance' in style) {
			cssClass += webkit;
			var ua = navigator.userAgent;
			
			if (ua.indexOf('Android') >= 0 && ua.indexOf('Chrome') === -1) {
				html.className += cssClass + browser + android;
				return {
					vendor: webkit,
					browser: android
				}
			}
			else if (!!window.chrome || ua.indexOf('OPR') >= 0) {
				html.className += cssClass + browser + chrome;
				return {
					vendor: webkit,
					browser: chrome
				}
			}
			else if (!!window.wiiu) {
				html.className += cssClass + browser + wiiu;
				return {
					vendor: webkit,
					browser: wiiu
				}
			}
			else {
				html.className += cssClass;
				return {
					vendor: webkit
				}
			}
		}
		// Mozilla
		else if ('MozAppearance' in style) {
			html.className += cssClass + mozilla;
			return {
				vendor: mozilla
			}
		}
		// IE
		else if ('-ms-scroll-limit' in style || 'behavior' in style) {
			cssClass += ie + vendor + ie;
			if ('-ms-ime-align' in style) {
				html.className += cssClass + '-11'
				return {
					vendor: ie,
					version: 11
				}
			}
			else if ('-ms-user-select' in style) {
				html.className += cssClass + '-10'
				return {
					vendor: ie,
					version: 10
				}
			}
			else if ('fill' in style) {
				html.className += cssClass + '-9';
				return {
					vendor: ie,
					version: 9
				}
			}
			else if ('widows' in style) {
				html.className += cssClass + '-8';
				return {
					vendor: ie,
					version: 8
				}
			}
			else {
				html.className += cssClass + '-7';
				return {
					vendor: ie,
					version: 7
				}
			}
		}
		// Opera
		else if ('OLink' in style || !!window.opera) {
			cssClass += opera;
			if ('OMiniFold' in style) {
				html.className += cssClass + '-mini';
				return {
					vendor: opera,
					version: 'mini'
				}
			}
			else {
				html.className += cssClass;
				return {
					vendor: opera
				}
			}
		}
		// KHTML
		else if ('KhtmlUserInput' in style) {
			html.className += cssClass + khtml;
			return {
				vendor: khtml
			}
		}
		else {
			return false;
		}
})();