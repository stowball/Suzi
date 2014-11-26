/*!
* mqGenie v0.5.0
*
* Adjusts CSS media queries in browsers that include the scrollbar's width in the viewport width so they fire at the intended size
*
* Returns the mqGenie object containing .adjusted, .width & fontSize for use in re-calculating media queries in JavaScript with mqAdjust(string)
*
* Copyright (c) 2014 Matt Stow
*
* http://mattstow.com
*
* Licensed under the MIT license
*/
;(function(window, document) {
	if (!document.addEventListener) {
		window.mqGenie = {
			adjustMediaQuery: function(mediaQuery) {
				return mediaQuery;
			}
		}
		
		return;
	}
	
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
	
	function getMediaQueries(stylesheet) {
		return processRules(stylesheet, function (rule) {
			return rule.constructor === CSSMediaRule;
		});
	}
	
	function sameOrigin(url) {
		var loc = window.location,
			a = document.createElement('a');
		
		a.href = url;
		
		return a.hostname === loc.hostname && a.protocol === loc.protocol;
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
	
	document.addEventListener('DOMContentLoaded', function() {
		window.mqGenie = (function() {
			var html = document.documentElement;
			
			html.style.overflowY = 'scroll';
			
			var width = window.innerWidth - html.clientWidth,
				props = {
					adjusted: width > 0,
					fontSize: parseFloat(window.getComputedStyle(html).getPropertyValue('font-size')),
					width: width,
					adjustMediaQuery: function(mediaQuery) {
						if (!mqGenie.adjusted)
							return mediaQuery;

						var mq = mediaQuery.replace(/\d+px/gi, function(c) {
							return parseInt(c, 10) + mqGenie.width + 'px';
						});

						mq = mq.replace(/\d.+?em/gi, function(c) {
							return ((parseFloat(c) * mqGenie.fontSize) + mqGenie.width) / mqGenie.fontSize + 'em';
						});

						return mq;
					}
				};
			
			if (props.adjusted) {
				if ('WebkitAppearance' in html.style) {
					var chromeRX = /Chrome\/(\d*?\.\d*?\.\d*?\.\d*?)\s/g,
						chrome = navigator.userAgent.match(chromeRX),
						chromeVersion;
					
					if (chrome) {
						chrome = chrome[0].replace(chromeRX, '$1');
						chromeVersion = chrome.split('.');
						chromeVersion[0] = parseInt(chromeVersion[0]);
						chromeVersion[2] = parseInt(chromeVersion[2]);
						chromeVersion[3] = parseInt(chromeVersion[3]);
						
						if (chromeVersion[0] <= 29) {
							if (chromeVersion[0] === 29 && chromeVersion[2] < 1548 && chromeVersion[3] < 57) {
								props.adjusted = false;
							}
							else if (chromeVersion[0] < 29) {
								props.adjusted = false;
							}
						}
					}
					else {
						props.adjusted = false;
					}
					
					if (!props.adjusted)
						return props;
				}
				
				var stylesheets = getStylesheets(),
					stylesheetsLength = stylesheets.length,
					i = 0,
					mediaQueries,
					mediaQueriesLength;
				
				for (i; i < stylesheetsLength; i++) {
					mediaQueries = getMediaQueries(stylesheets[i]);
					mediaQueriesLength = mediaQueries.length;
					
					for (var j = 0; j < mediaQueriesLength; j++) {
						mediaQueries[j].media.mediaText = mediaQueries[j].media.mediaText.replace(/m(in|ax)-width:\s*(\d|\.)+(px|em)/gi, function(strA) {
							if (strA.match('px')) {
								return strA.replace(/\d+px/gi, function(strB) {
									return parseInt(strB, 10) + props.width + 'px';
								});
							}
							else {
								return strA.replace(/\d.+?em/gi, function(strB) {
									return ((parseFloat(strB) * props.fontSize) + props.width) / props.fontSize + 'em';
								});
							}
						});
					}
				}
			}
			
			return props;
		})();
	});
})(window, document);