/*
* Firefox Detect Hardware Acceleration jQuery plugin v0.1
*
* Detects whether hardware acceleration is in use in Firefox and adds a class of "hwa" or "no-hwa" class to the html tag where appropriate
*
* Copyright (c) 2013 Izilla
* http://izilla.com.au
* Licensed under the MIT license
*/
;(function($) {
	$.fn.firefoxHWA = function() {
	}
	
	function hwa(disabled) {
		var hwa = 'hwa';
		if (disabled)
			hwa = disabled + hwa;
		$('html').addClass(hwa);
	}
	
	(function() {
		var style = ' style="bottom: 0; line-height: normal; position: absolute; visibility: hidden; font-family: Arial; font-size: ',
			no = 'no-';
			
		$('body').append('<div id="hwa1"' + style + '20px;">1</div><div id="hwa2"' + style + '35px;">2</div>');
		
		var $hwa1 = $('#hwa1'),
			$hwa2 = $('#hwa2'),
			fontSize1 = parseFloat($hwa1.css('font-size')),
			height1 = parseFloat($hwa1.css('height')),
			height2 = parseFloat($hwa2.css('height'));
		
		$hwa1.remove();
		$hwa2.remove();
		
		if (fontSize1 === 20) {
			if (height1 === 25 && height2 === 41)
				hwa();
			else if (height1 === 25 && height2 === 40)
				hwa(no);
			else if (height1 === 25 && height2 === 42)
				hwa();
			else if (height1 === 24 && height2 === 40)
				hwa(no);
			else if (height1 === 23 && height2 === 40)
				hwa(no);
			else if (height1 === 24 && height2 === 41)
				hwa(no);
			else if (height1 === 24 && height2 === 42)
				hwa();
			else
				hwa(no);
		}
		else if (fontSize1 === 16) {
			if (height1 === 20)
				hwa();
			else
				hwa(no);
		}
		else if (fontSize1 === 17.9833) {
			if (height2 === 38)
				hwa();
			else
				hwa(no);
		}
		else if (fontSize1 === 22) {
			if (height2 === 46)
				hwa();
			else
				hwa(no);
		}
		else if (fontSize1 === 24) {
			if (height1 === 29)
				hwa();
			else
				hwa(no);
		}
		else if (fontSize1 === 26.6) {
			if (height1 === 32)
				hwa();
			else
				hwa(no);
		}
		else
			hwa(no);
	})();
})(jQuery);