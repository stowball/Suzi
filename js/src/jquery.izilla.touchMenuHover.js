/*!
 * Izilla touchMenuHover jQuery plugin v1.7
 * Allows ULs (or any element of your choice) that open on li:hover to open on tap/click on mobile platforms such as iOS, Android, WP7, WP8, BlackBerry, Bada, WebOS, 3DS & WiiU
 *
 * Copyright (c) 2014 Izilla Partners Pty Ltd
 *
 * http://izilla.com.au
 *
 * Licensed under the MIT license
 */
;(function($) {
	$.fn.touchMenuHover = function(options) {
		var settings = $.extend({
			childTag: 'ul',
			closeElement: '',
			forceiOS: false,
			openClass: 'tmh-open'
		}, options);
		
		var $a = $(this).find('a'),
			devices = '3ds|android|bada|bb10|hpwos|iemobile|kindle fire|opera mini|opera mobi|opera tablet|rim|silk|wiiu',
			devicesRX,
			closeStr = 'html',
			$close;
		
		if (settings.childTag.toString().toLowerCase() !== 'ul' || settings.forceiOS)
			devices += '|ipad|ipod|iphone';
		
		devicesRX = new RegExp(devices, 'gi');
		
		if ($a.length > 0 && devicesRX.test(navigator.userAgent)) {
			$a.each(function() {
				var $this = $(this),
					$parent = $this.parent('li'),
					$siblings = $parent.siblings().find('a');
				
				if ($this.next(settings.childTag).length > 0)
					$parent.attr('aria-haspopup', true);
				
				$this.click(function(e) {
					var $this = $(this);
					e.stopPropagation();
					$siblings.removeClass(settings.openClass);
					
					if (!$this.hasClass(settings.openClass) && $this.nextAll(settings.childTag).length > 0) {
						e.preventDefault();
						$this.addClass(settings.openClass);
					}
				});
			});
			
			if (settings.closeElement.length > 1)
				closeStr += ',' + settings.closeElement;
			
			$close = $(closeStr);
			
			if ('ontouchstart' in window)
				$close.css('cursor', 'pointer');
			
			$close.click(function() {
				$a.removeClass(settings.openClass);
			});
		}
		
		return this;
	};
})(jQuery);