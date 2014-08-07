/*
 * Viewport Genie v0.3
 * Adds the "real" viewport width and height (in px and em) as an element on the body to help with obtaining values for responsive breakpoints when ?genie=true
 *
 * Use it in conjunction with mqGenie (https://github.com/stowball/mqGenie) to trigger the correct breakpoints in non-WebKit browsers
 * 
 * Copyright (c) 2013 Matt Stow
 *
 * http://mattstow.com
 *
 * Licensed under the MIT license
 */
;(function(param) {
	if (param) {
		var rx = /(&|\?)(\w+)=true/gi,
			str = window.location.href,
			m,
			s = '',
			gup = {};
		
		while (m = rx.exec(str)) {
			s += ' ' + m[2];
			gup[m[2]] = true;
		}
		
		if (!gup.genie)
			return;
	}
	
	var $html = document.documentElement,
		$head = document.head,
		$body = document.body,
		id = 'vp-genie',
		$genie = document.getElementById(id),
		$style = document.getElementById(id + '-style'),
		fontSize,
		property = $html.clientWidth ? true: false;
	
	var viewportGenie = {
		init: function() {			
			if ($genie) {
				$body.removeChild($genie);
				$head.removeChild($style);
				return;
			}

			var css =	'#' + id + '{' +
						'background: rgba(255,0,0,.75);' +
						'border: 1px solid #900;' +
						'-webkit-box-shadow: 2px 2px 2px rgba(0,0,0,.3);' +
						'box-shadow: 2px 2px 2px rgba(0,0,0,.3);' +
						'color: #fff;' +
						'font-family: monospace;' +
						'font-size: 13px;' +
						'left: 0;' +
						'line-height: 17px;' +
						'padding: 3px 6px 5px;' +
						'position: fixed;' +
						'top: 0;' +
						'z-index: 9999;' +
						'}' +
						'#' + id + ' span {' +
							'white-space: nowrap;' +
						'}',
				rules = document.createTextNode(css);

			$style = document.createElement('style');
			$style.setAttribute('id', id + '-style');
			$style.type = 'text/css';
			
			if ($style.styleSheet)
				$style.styleSheet.cssText = rules.nodeValue;
			else
				$style.appendChild(rules);
			
			$head.appendChild($style);
			
			$genie = document.createElement('div');
			$genie.setAttribute('id', id);
			$body.appendChild($genie);
			
			viewportGenie.calculate();
			if (window.addEventListener)
				window.addEventListener('resize', viewportGenie.calculate, false);
			
		},
		calculate: function() {		
			if (window.getComputedStyle)
				fontSize = parseInt(window.getComputedStyle($html).getPropertyValue('font-size'));
			else
				fontSize = 16;
			
			var width,
				height; 
			
			if (property) {
				width = $html.clientWidth;
				height = $html.clientHeight;
			}
			else {
				width = window.innerWidth;
				height = window.innerHeight;
			}
			
			$genie.innerHTML = 	'<span>' +
								width + 'px' +
								' &times; ' +
								height + 'px' +
								'</span>' +
								' &bull; ' +
								'<span>' +
								width/fontSize + 'em' +
								' &times; ' +
								height/fontSize + 'em' +
								'</span>';
		}
	};
	viewportGenie.init();
})(true);