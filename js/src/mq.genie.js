/*
* mqGenie v0.2.2
*
* Adjusts CSS media queries in browsers that include the scrollbar's width in the viewport width so they fire at the intended size
*
* Returns the mqGenie object containing .adjusted, .width & fontSize for use in re-calculating media queries in JavaScript with mqAdjust(string)
*
* Copyright (c) 2013 Matt Stow
*
* http://mattstow.com
*
* Licensed under the MIT license
*/
;var cssjs = (function() {
	
	function processRules(stylesheet, processor) {
		var rules = stylesheet.cssRules ? stylesheet.cssRules : stylesheet.media,
			rule,
			processed = [],
			i = 0,
			length = rules.length;

		for (i; i < length; i ++) {
			rule = rules[i];

			if (processor(rule))
				processed.push(rule);
		}

		return processed;
	}

	function getUnusedRules(stylesheet) {
		return processRules(stylesheet, function isUnused(rule) {
			return rule.constructor === CSSStyleRule && $(rule.selectorText).length === 0;
		});
	}

	function getMediaQueries(stylesheet) {
		return processRules(stylesheet, function (rule) {
			return rule.constructor === CSSMediaRule;
		});
	}

	function sameOrigin(url) {
		var loc = window.location,
			a = document.createElement('a');

		a.href = url;

		return a.hostname === loc.hostname && a.port === loc.port && a.protocol === loc.protocol;
	}

	function isInline(stylesheet) {
		return stylesheet.ownerNode.constructor === HTMLStyleElement;
	}

	function isValidExternal(stylesheet) {
		return stylesheet.href && sameOrigin(stylesheet.href);
	}

	function getStylesheets() {
		var sheets = document.styleSheets,
			sheet,
			length = sheets.length,
			i = 0,
			valid = [];

		for (i; i < length; i++) {
			sheet = sheets[i];

			if (isValidExternal(sheet) || isInline(sheet))
				valid.push(sheet);
		}

		return valid;
	}

	return {
		sameOrigin: sameOrigin,
		getStylesheets: getStylesheets,
		getUnusedRules: getUnusedRules,
		getMediaQueries: getMediaQueries
	};

}());

var mqGenie = (function() {

	var html = document.documentElement;
	
	if (window.getComputedStyle && window.getComputedStyle(html).getPropertyValue('overflow-y') != 'scroll')
		html.style.overflowY = 'scroll';
	
	var width = window.innerWidth - html.clientWidth,
		props = {
			adjusted: !('WebkitAppearance' in html.style) && width > 0,
			width: width,
			fontSize: 16
		};
	
	if (props.adjusted) {
		var mediaQueries,
			mediaQueryText;
		
		if (window.getComputedStyle)
			props.fontSize = parseFloat(window.getComputedStyle(html).getPropertyValue('font-size'));
		
		var stylesheets = cssjs.getStylesheets(),
			i = 0;
		
		for (i; i < stylesheets.length; i++) {
			mediaQueries = cssjs.getMediaQueries(stylesheets[i]);
			for (var j = 0; j < mediaQueries.length; j++) {
				mediaQueryText = mediaQueries[j].media.mediaText.replace(/\d+px/gi, function(c) {
					return parseInt(c, 10) + props.width + 'px';
				});
				
				mediaQueryText = mediaQueryText.replace(/\d.+?em/gi, function(c) {
					return ((parseFloat(c) * props.fontSize) + props.width) / props.fontSize + 'em';
				});
				mediaQueries[j].media.mediaText = mediaQueryText;
			}
		};
	}

	return props;

})();

var mqAdjust = function(mediaQuery) {
	if (!mqGenie.adjusted)
		return mediaQuery;
	
	var mq = mediaQuery.replace(/\d+px/gi, function(c) {
		return parseInt(c, 10) + mqGenie.width + 'px';
	});
	
	mq = mq.replace(/\d.+?em/gi, function(c) {
		return ((parseFloat(c) * mqGenie.fontSize) + mqGenie.width) / mqGenie.fontSize + 'em';
	});
	
	return mq;
};