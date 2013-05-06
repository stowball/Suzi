/*
* Izilla Search and Display jQuery Google Analytics Tracker v1.2.1
* Allows cross domain, file and external link tracking
*
* Copyright (c) 2013 Izilla Partners Pty Ltd
*
* http://www.izilla.com.au
* http://www.searchanddisplay.com.au
*
* Licensed under the MIT license
*/
;(function($) {
	$.fn.isdAnalyticsTracker = function(options) {
		if (typeof(_gaq) === 'undefined')
			return this;
		
		var settings = $.extend({
			'trackCrossDomain': false,
			'domains': '',
			'trackAlternatePropertyIDs': false,
			'alternatePropertyIDs': ['isd2'],
			'trackFiles': true,
			'trackFilesAsEvent': false,
			'appendFiles': true,
			'defaultFiles': [
				'.csv',
				'.doc',
				'.pdf',
				'.ppt',
				'.rar',
				'.rtf',
				'.txt',
				'.xls',
				'.zip'
			],
			'files': '',
			'eventCategory': 'External',
			'delay': 200
		}, options);
		
		var host = window.location.host,
			domains = settings.domains,
			domains = [].concat(domains),
			altIDs = settings.alternatePropertyIDs.toString().replace(/\s/g, ''),
			altIDs = altIDs.split(','),
			files = settings.appendFiles ? settings.defaultFiles.concat(settings.files) : settings.files,
			trackFiles = false,
			trackFilesAsEvent = settings.trackFilesAsEvent,
			delay = parseInt(settings.delay),
			start = '[href*="',
			end = '"]',
			hostSelector = start + host + end,
			regex,
			$domainLinks,
			$externalLinks,
			$internalLinks,
			href = 'href',
			category = settings.eventCategory.toString().length > 0 ? settings.eventCategory.toString() : 'External',
			clk = 'Click',
			tgt = 'target',
			trackEvent = '_trackEvent',
			trackPageview = '_trackPageview';
		
		var convertToSelector = function(array) {
			var str = array
						.toString()
						.replace(/\s*/g, '')
						.replace(/^(.{1})/, start + '$1')
						.replace(/,/g, end + ',' + start)
						.replace(/(.{1})$/, '$1' + end);
			return str;
		}
		
		if (!'WebkitAppearance' in document.documentElement.style)
			delay = 0;
		
		if (settings.trackCrossDomain && domains.length > 0) {
			for (var i = 0; i < domains.length; i++) {
				regex = new RegExp(domains[i], 'g');
				if (regex.test(host))
					break;
			}
			
			domains.splice(i, 1);
			domains = convertToSelector(domains);
			
			$domainLinks =
				this
				.filter(domains)
				.not(hostSelector)
				.each(function() {
					$(this).click(function() {
						_gaq.push(['_link', $(this).attr(href)]);
						return false;
					});
				});
		}
		
		if (settings.trackFiles && files.length > 0) {
			files = convertToSelector(files);
			trackFiles = true;
		}
		
		$externalLinks = 
			this
			.filter('[href^="http"]')
			.not(hostSelector)
			.not($domainLinks);
		
		if (trackFiles && trackFilesAsEvent) {
			$externalLinks =
				$externalLinks
				.add(files)
				.filter(this);
		}
		
		$externalLinks.each(function() {
			$(this).on('click', function() {
				var $this = $(this),
					thisHref = $this.attr(href);
				
				_gaq.push([trackEvent, category, clk, thisHref]);
				
				if (settings.trackAlternatePropertyIDs && altIDs.length > 0) {
					for (var i = 0; i < altIDs.length; i++) {
						_gaq.push(['' + altIDs[i] + '.' + trackEvent, category, clk, thisHref]);
					}
				}
				
				if ((!$this.attr(tgt) || $this.attr(tgt).toLowerCase() != '_blank') && delay > 0) {
					setTimeout(function() {
						window.location.href = thisHref;
					}, delay);
					return false;
				}
			});
		});
		
		var $internalLinks =
				this
				.not($domainLinks)
				.not($externalLinks)
				.not(hostSelector)
				.not('[href^="/"]')
				.not('[href^="../"]');
		
		if (trackFiles && !trackFilesAsEvent) {
			$internalLinks =
				$internalLinks
				.add(files)
				.filter(this);
		}
		
		$internalLinks.each(function() {
			$(this).on('click', function() {
				var thisHref = $(this).attr(href);
				
				_gaq.push([trackPageview, thisHref]);
				
				if (settings.trackAlternatePropertyIDs && altIDs.length > 0) {
					for (var i = 0; i < altIDs.length; i++) {
						_gaq.push(['' + altIDs[i] + '.' + trackPageview, thisHref]);
					}
				}
				
				if (delay > 0) {
					setTimeout(function() {
						window.location.href = thisHref;
					}, delay);
					return false;
				}
			});
		});
		
		return this;
	};
})(jQuery);