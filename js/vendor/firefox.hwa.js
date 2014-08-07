/*!
* Firefox Detect Hardware Acceleration plugin v0.3
*
* Detects whether hardware acceleration is in use in Firefox and adds a class of "hwa" or "no-hwa" class to the html tag where appropriate
* Requires LayoutEngine and CssUserAgent
*
* Copyright (c) 2013 Izilla Partners Pty Ltd
* http://izilla.com.au
* Licensed under the MIT license
*/
;(function(window, document, body) {
	if (!(layoutEngine.vendor === 'mozilla' && cssua.ua.desktop === 'windows'))
		return;
	
	function hwa(disabled) {
		var hwa = 'hwa';
		if (disabled)
			hwa = disabled + hwa;
		
		document.documentElement.className += ' ' + hwa;
	}
	
	var hwa1 = document.createElement('div'),
		hwa2 = document.createElement('div'),
		style = 'bottom: 0; line-height: normal; position: absolute; visibility: hidden; font-family: Arial; font-size: ',
		no = 'no-';
	
	hwa1.appendChild(document.createTextNode('1'));
	hwa2.appendChild(document.createTextNode('2'));
	hwa1.setAttribute('style', style + '20px');
	hwa2.setAttribute('style', style + '35px');
	body.appendChild(hwa1);
	body.appendChild(hwa2);
	
	var fontSize1 = parseFloat(window.getComputedStyle(hwa1).getPropertyValue('font-size')),
		height1 = parseFloat(hwa1.offsetHeight),
		height2 = parseFloat(hwa2.offsetHeight);
	
	body.removeChild(hwa1);
	body.removeChild(hwa2);
	
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
})(window, document, document.body);