/*
* rwdImages jQuery plugin v1.4
*
* Allows responsive content images using the redux spacer technique (http://mattstow.com/experiment/responsive-images-redux/responsive-images-redux-jquery-plugin.html) to be shared and saved
*
* Copyright (c) 2013 Matt Stow
* http://mattstow.com
* Licensed under the MIT license
*/
;(function($) {
	$.fn.rwdImages = function(options) {
		var settings = $.extend({
			display: 'inline-block',
			zindex: false
		}, options);
		
		var $that = $(this),
			style = document.documentElement.style,
			ltie9 = 'behavior' in style && 'widows' in style && !('fill' in style) ? true : false,
			ltie8 = navigator.appVersion.indexOf('MSIE 7') != -1 ? true : false,
			css = 'display: ' + settings.display + '; max-width: 100%; position: relative;',
			opacity = '';
		
		if ($that.length > 0) {
			var backgroundImage = 'background-image',
				src = /(url\("?)(.*?)("?\))/gi,
				attrSrc = 'src',
				swap = 'rwd-swap',
				$imgs;
			
			if (settings.zindex)
				css += ' z-index: ' + settings.zindex;
			
			if (ltie9)
				opacity = '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";';
			
			$('head').append(
				'<style>' +
					'.' + swap + '{' +
					'height: 100%;' +
					'left: 0;' +
					'opacity: 0;' +
					opacity +
					'position: absolute;' +
					'top: 0;' +
					'width: 100%}' +
				'</style>');
			
			$that.each(function() {
				var $this = $(this),
					newSrc,
					bg = $this.css(backgroundImage);
					
				if (bg.match(src))
					newSrc = bg.replace(src, '$2');
				
				if (!ltie8) {
					$this
						.wrap('<span class="rwd-wrap" style="' + css + '" />')
						.clone()
						.removeClass($that.attr('class'))
						.addClass(swap)
						.appendTo($this.parent())
						.attr(attrSrc, newSrc);
				}
				else {
					$this.attr(attrSrc, newSrc).css('background-image', 'none').wrap('<span class="rwd-wrap" style="' + css + '" />');
				}
			});
			
			
			if (!ltie8) {
				$imgs = $('img.' + swap);
				
				$(window).resize(function() {
					$imgs.each(function() {
						var $this = $(this),
							$prev = $this.prev(),
							newSrc,
							bg = $prev.css(backgroundImage);
						
						if (bg.match(src))
							$this.attr(attrSrc, bg.replace(src, '$2'));
					});
				});
			}
		}
		return this;
	}
})(jQuery);