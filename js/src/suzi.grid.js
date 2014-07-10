/*!
 * Suzi Grid v0.1.2
 *
 * A JavaScript implementation of Suzi's grid system for rapid development
 *
 * Copyright (c) 2014 Matt Stow
 *
 * http://mattstow.com
 *
 * Licensed under the MIT license
*/
;(function() {
	var grid = {
		css: '',
		
		setup: function(refresh) {
			var gridContainers = Array.prototype.slice.call(document.getElementsByClassName('grid_container')),
				gridItems = Array.prototype.slice.call(document.getElementsByClassName('grid_item')),
				widthsArray = [],
				uniqueWidths,
				widthsAtArray = [],
				uniqueWidthsAt,
				currentElem,
				css,
				sassArgs = '',
				customGutter = window.location.search.match(/gutter=(\d+)/),
				gutterValue = customGutter ? window.location.search.match(/gutter=(\d+)/)[1] + 'px' : '20px',
				getSetStyle = function(elem, property) {
					var value = customGutter ? gutterValue : '20px';
					
					if (property === 'margin-left')
						value = '-' + value;
					
					if ((Math.abs(parseInt(window.getComputedStyle(elem).getPropertyValue(property))) === 99) || customGutter) {
						elem.style.cssText += property + ':' + value;
					}
				};
			
			if (gridContainers.length === 0)
				return;
			
			css =	'.grid_container {\n' +
						'list-style: none;\n' +
					'}\n' +
					
					'.grid_container:after {\n' +
						'clear: both;\n' +
						'content: ".";\n' +
						'display: block;\n' +
						'height: 0;\n' +
						'visibility: hidden;\n' +
					'}\n' +
					
					'.grid_item {' +
						'-moz-box-sizing: border-box;\n' +
						'-webkit-box-sizing: border-box;\n' +
						'box-sizing: border-box;\n' +
						'float: left;\n' +
						'width: 100%;\n' +
					'}\n';
			
			if (!refresh) {
				gridContainers.forEach(function(elem, pos) {
					currentElem = gridContainers[pos];
					getSetStyle(currentElem, 'margin-left');
				});
			}
			
			gridItems.forEach(function(elem, pos) {
				currentElem = gridItems[pos];
				
				if (!refresh) {
					getSetStyle(currentElem, 'margin-bottom');
					getSetStyle(currentElem, 'padding-left');
				}
				
				if (currentElem.className.match(/\bw\d+\b/g)) {
					currentElem.className.match(/\bw\d+\b/g).forEach(function(elem, pos) {
						if (currentElem.className.match(/\bw\d+\b/g)[pos])
							widthsArray.push(currentElem.className.match(/\bw\d+\b/g)[pos]);
					});
				}
				
				if (currentElem.className.match(/\bw\d+_at_\d+\b/g)) {
					currentElem.className.match(/\bw\d+_at_\d+\b/g).forEach(function(elem, pos) {
						if (currentElem.className.match(/\bw\d+_at_\d+\b/g)[pos]) {
							widthsArray.push(currentElem.className.match(/\bw\d+_at_\d+\b/g)[pos]);
							widthsAtArray.push(currentElem.className.match(/\bw\d+_at_\d+\b/g)[pos]);
						}
					});
				}
			});
			
			if (widthsArray.length === 0 && widthsAtArray.length === 0)
				return;
			
			var sortNumber = function(a, b) {
				return a - b;
			};
			
			var convertWidth = function(value) {
				var width = parseInt(value, 10);
				
				if (width === 16)
					width = 16.6667;
				else if (width === 33)
					width = 33.3333;
				else if (width === 66)
					width = 66.6666;
				
				return width;
			};
			
			widthsArray.forEach(function(elem, pos) {
				widthsArray[pos] = parseInt(elem.replace(/_at_.*/g, '').replace(/w/, ''));
			});
			
			widthsArray.sort(sortNumber);
			
			uniqueWidths = widthsArray.filter(function(elem, pos) {
				return widthsArray.indexOf(elem) === pos;
			});
			
			widthsAtArray.forEach(function(elem, pos) {
				widthsAtArray[pos] = parseInt(elem.replace(/.*?_at_/g, '').replace(/w/, ''));
			});
			
			widthsAtArray.sort(sortNumber);
			
			uniqueWidthsAt = widthsAtArray.filter(function(elem, pos) {
				return widthsAtArray.indexOf(elem) === pos;
			});
			
			var nthClearing = function(elem, width, mq) {
				var fraction = 100 / width,
					is33 = width === 33.3333 ? true : false,
					mqAdjusted = window.mqGenie && window.mqGenie.adjusted ? mq + window.mqGenie.width : mq;
				
				if (is33 || (Math.round(fraction) === fraction && (fraction > 1 && fraction < 6))) {
					if (!mq) {
						css += '.' + elem + ':nth-child(n) { clear: none; }\n';
						
						if (is33) {
							css += '.' + elem + ':nth-child(3n+4) { clear: both; }\n';
						}
						else {
							css += '.' + elem + ':nth-child(' + fraction + 'n+' + (fraction + 1) + ') { clear: both; }\n';
						}
					}
					else {
						css += '@media (min-width: ' + mqAdjusted + 'px) { .' + elem + '_at_' + mq + ':nth-child(n) { clear: none; } }\n';
						
						if (is33) {
							css += '@media (min-width: ' + mqAdjusted + 'px) { .' + elem + '_at_' + mq + ':nth-child(3n+4) { clear: both; } }\n';
						}
						else {
							css += '@media (min-width: ' + mqAdjusted + 'px) { .' + elem + '_at_' + mq + ':nth-child(' + fraction + 'n+' + (fraction + 1) + ') { clear: both; } }\n';
						}
					}
				}
			};
			
			uniqueWidths.forEach(function(elem, pos) {
				var width = convertWidth(elem);
				
				css += '.w' + elem + ' { width: ' + width + '%; }\n';
				
				nthClearing('w' + elem, width);
			});
			
			css +=  '.clear:nth-child(n) { clear: both; }\n' +
					'.unclear:nth-child(n) { clear: none; }\n';
			
			uniqueWidthsAt.forEach(function(elem, pos) {
				uniqueWidths.forEach(function(elem2, pos2) {
					var width = convertWidth(elem2),
						mq = parseInt(elem);
					
					if (window.mqGenie && window.mqGenie.adjusted)
						mq += window.mqGenie.width;
					
					css += '@media (min-width: ' + mq + 'px) { .w' + elem2 + '_at_' + elem + ' { width: ' + width + '%; } }\n'
					
					nthClearing('w' + elem2, width, elem);
					
					if (pos2 === uniqueWidths.length - 1) {
						css +=  '@media (min-width: ' + mq + 'px) { .clear_at_' + elem + ' { clear: both; } }\n' +
								'@media (min-width: ' + mq + 'px) { .unclear_at_' + elem + ' { clear: none; } }\n';
					}
				});
			});
			
			grid.css = css;
			//console.log(grid.css);
			
			sassArgs =  '(' +
						uniqueWidthsAt.toString().replace(/,/g, ', ') +
						'), (' +
						uniqueWidths.toString().replace(/,/g, ', ') +
						')';
			
			sassArgs =  sassArgs
						.replace(/(\(|, )16/, '$116.6667')
						.replace(/(\(|, )33/, '$133.3333')
						.replace(/(\(|, )66/, '$166.6666')
						.replace(/(\(|, )83/, '$183.3333');

			console.log(sassArgs);
		},
		
		init: function() {
			if (!window.getComputedStyle)
				return;
				
			var styleGutter = document.createElement('style'),
				style = document.createElement('style'),
				gutterCss = '.grid_container {\n' +
								'margin-left: -99px;\n' +
							'}\n' +
							
							'.grid_item {' +
								'margin-bottom: 99px;\n' +
								'padding-left: 99px;\n' +
							'}\n';
			
			styleGutter.type = 'text/css';
			style.type = 'text/css';
			style.id = 'suzi_grid';
			
			styleGutter.appendChild(document.createTextNode(gutterCss));
			document.head.insertBefore(styleGutter, document.getElementsByTagName('link')[0]);
			
			grid.setup();
			
			style.appendChild(document.createTextNode(grid.css));
			document.head.appendChild(style);
		},
		
		refresh: function() {
			grid.setup(true);
			
			document.getElementById('suzi_grid').innerHTML = grid.css;
		}
	};
	
	grid.init();
	
	window.suzigrid = grid.refresh;
})(window, document);