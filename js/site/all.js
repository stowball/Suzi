(function() {

$(document).ready(function(e) {
	$html.addClass('jquery');
	
	if (layoutEngine.vendor === 'mozilla' && cssua.ua.desktop === 'windows')
		Modernizr.load('/js/jquery.firefox.hwa.min.js');
	
	placeholder.init();
	tables.init();
	forms.init();
	slider.init();
	tabs.init();
	accordion.init();
	
	$('img.rwd').rwdImages({
		display: 'block'
	});
	
	$('a').isdAnalyticsTracker();
});

var html = document.documentElement,
	$html = $(html),
	actualFontSize = 16,
	baseFontSize = 16,
	multiplier,
	current = 'current',
	error = 'error',
	formError = 'form_error',
	open = 'open',
	ariaHidden = 'aria-hidden',
	ariaInvalid = 'aria-invalid',
	ariaDescribedBy = 'aria-describedby';

var trackEvent = function(campaign, action, label) {
	var clean = function(str) {
		return str.toString().replace(/\s|'|"/g, '-')
	}
	
	if (typeof(_gaq) !== 'undefined')
		_gaq.push(['_trackEvent', clean(campaign), clean(action), clean(label)]);
}

var viewportSize = {
	height: function() {
		if (html.clientHeight)
			return html.clientHeight;
		else
			return window.innerHeight;
	},
	width: function() {
		if (html.clientWidth)
			return html.clientWidth;
		else
			return window.innerWidth;
	},
	multiplier: function() {
		if (window.getComputedStyle)
			actualFontSize = parseInt(window.getComputedStyle(html).getPropertyValue('font-size'));
				
		return actualFontSize/baseFontSize;
	}
};

var cookie = {
	set: function(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = '; expires=' + date.toGMTString();
		}
		document.cookie = name + '=' + value + expires + '; path=/';
	},
	read: function(name) {
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		
		for (var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ')
				c = c.substring(1, c.length);
			
			if (c.indexOf(nameEQ) === 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	},
	erase: function(name) {
		cookie.set(name, '', -1);
	}
};

var placeholder = {
	init: function() {
		var pl = 'placeholder';
		if (!Modernizr.input.placeholder) {
			var $placeholder = $('['+pl+']');
			$placeholder.focus(function() {
				var input = $(this);
				if (input.val() == input.attr(pl))
					input.val('').removeClass(pl);
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr(pl))
					input.addClass(pl).val(input.attr(pl));
			}).blur();
			$placeholder.parents('form').on('submit', function() {
				$(this).find('['+pl+']').each(function() {
					var $input = $(this);
					if ($input.val() == $input.attr(pl))
						$input.val('');
				});
			});
		}
		$html.addClass(pl);
	}
};

var tables = {
	init: function() {
		$('table').each(function() {
			var $this = $(this);
			$this.wrap('<div class="overflow_x std_margin ' + $this.attr('class') + '" />');
		});
	}
};

var forms = {
	requiredFields: [],
	
	init: function() {
		var $forms = $('form');
		
		$forms.each(function(index) {
			var $this = $(this);
			forms.requiredFields[index] = $this.find('[required]');
			$this.on('submit', function() {
				return forms.validate($this, index);
			});
		});
	},
	validate: function(form, index) {
		var $requireds = $(forms.requiredFields[index]),
			errors = false,
			tested = 'tested';
		
		$requireds.removeClass(formError).removeClass(tested);
		
		$requireds.each(function() {
			var $this = $(this);
			if ($this.is('[type="radio"], [type="checkbox"]') && !$this.hasClass(tested)) {
				var name = $this.attr('name'),
					$radioChecks = $requireds.filter('[name="' + name + '"]');
				
				if (!$radioChecks.is(':checked')) {
					$radioChecks.addClass(formError);
					$this.attr(ariaInvalid, false);
				}
				$radioChecks.addClass(tested);
			}
			if ($.trim($this.val()).length === 0) {
				$this.addClass(formError);
				$this.attr(ariaInvalid, false);
				errors = true;
			}
		});
		
		$requireds.filter(formError + ':first').focus();
		
		return !errors;
	}
};

var slider = {
	init: function() {
		var $sliderParent = $('.feature_slider');
		
		if ($sliderParent.length) {
			$sliderParent.each(function(index) {
				var $this = $(this),
					$slides = $this.find('li'),
					slidesCount = $slides.length,
					globalPos = 0,
					carouselID = 'carouselid-' + window.location.pathname + '-' + index,
					carouselCookie = cookie.read(carouselID);
								
				if (carouselCookie)
					globalPos = parseInt(carouselCookie);
				
				if (slidesCount > 1) {
					var li = '',
						interval = false,
						nav = true;
						pager = true;
					
					if (!supports.touch && parseInt($this.data('interval')))
						interval = parseInt($this.data('interval') * 1000);
					
					if ($this.data('nav') === false) {
						nav = false;
					}
					else {
						var $navPrev = $('<a href="#previous" class="nav prev"><span>Previous</span></a>'),
							$navNext = $('<a href="#next" class="nav next"><span>Next</span></a>');
					}
					
					if ($this.data('pager') === false)
						pager = false;
					else
						var $navPager = $('<ul class="nav_pager reset menu" />');
					
					if (nav)
						$this.append($navPrev).append($navNext);
					
					if (pager)
						$this.append($navPager);
					
					$this.addClass('multiple')
					
					if (Modernizr.csstransforms && !(layoutEngine.vendor === 'ie' && layoutEngine.version === 9)) {
						if (pager) {
							for (var i = 1; i <= slidesCount; i++) {
								li += '<li><a href="#slide-' + i + '">Slide ' + i + '</a></li>';
							}
							
							$navPager.append(li);
							var $navPagerLi = $navPager.find('li'),
								$navPagerA = $navPager.find('a');
						}
						
						var $feature = $this.find('.inner');
						
						var carousel = new Swipe($feature[0], {
							complete: function() {
								this.slide(globalPos);
							},
							callback: function(e, pos) {
								$slides.eq(0).css('visibility', 'visible');
								$slides.attr(ariaHidden, true);
								$slides.eq(pos).attr(ariaHidden, false);
								
								if (pager) {
									$navPagerLi.removeClass(current);
									$navPagerLi.eq(pos).addClass(current);
								}
								
								if (!interval)
									trackEvent('Website', 'Carousel', 'Slide ' + (pos + 1));
								
								globalPos = pos;
								cookie.set(carouselID, globalPos);
							}
						});
						
						$this.addClass('swipejs');
						
						var stopCarousel = function() {
							if (interval) {
								window.clearTimeout(timer);
								interval = false;
							}
						};
												
						if (nav) {
							$navPrev.on('click', function(e) {
								e.preventDefault();
								
								carousel.prev();
								stopCarousel();
							});
							
							$navNext.on('click', function(e) {
								e.preventDefault();
								
								carousel.next();
								stopCarousel();
							});
						}
						
						if (pager) {
							$navPagerA.each(function(idx) {
								var i = idx;
								$(this).on('click', function(e) {
									e.preventDefault();
									
									carousel.slide(i);
									
									$navPagerLi.removeClass(current);
									$(this).parent().addClass(current);
									
									stopCarousel();
								});
							});
						}
						
						var autoCarousel = function() {
							carousel.next();
						};
						
						if (interval) {
							timer = window.setInterval(autoCarousel, interval);
							var $tile = $this.find('.tile');
							
							$tile.hover(
								function(e) {
									e.stopPropagation();
									if (interval)
										window.clearTimeout(timer);
								},
								function(e) {
									e.stopPropagation();
									if (interval)
										timer = window.setInterval(autoCarousel, interval);
								}
							);
						}
					}
					else {
						var $feature = $this.find('.slider'),
							w = 'width: 100% !important',
							cycleOpts = {
								activePagerClass: current,
								cleartypeNoBg: true,
								fx: 'scrollHorz',
								speed: 'fast',
								startingSlide: globalPos,
								timeout: interval,
								after: function(curr, next, opts) {
									var pos = opts.currSlide;
									
									$slides.attr(ariaHidden, true);
									$slides.eq(pos).attr(ariaHidden, false);
									
									globalPos = pos;
									cookie.set(carouselID, globalPos);
								}
							};
						
						if (nav) {
							$navPrev.attr('id', 'nav_prev-' + index);
							$navNext.attr('id', 'nav_next-' + index);
							cycleOpts.prev = '#nav_prev-' + index;
							cycleOpts.next = '#nav_next-' + index;
						}
						
						if (pager) {
							$navPager.attr('id', 'nav_pager-' + index);
							cycleOpts.pager = '#nav_pager-' + index;
							cycleOpts.pagerAnchorBuilder = function(idx, slide) {
								return '<li><a href="#slide-' + (idx + 1) + '">Slide ' + (idx + 1) + '</a></li>';
							}
						}
						
						$feature.attr('style', w);
						$feature.find('li').attr('style', w);
						
						Modernizr.load({
							load: '/js/jquery.cycle.all.min.js',
							complete: function() {
								$feature.cycle(cycleOpts);
								$slides.eq(0).css('visibility', 'visible');
								
								$navPrev.on('click', function(e) {
									e.preventDefault();
									$feature.cycle('pause');
								});
								
								$navNext.on('click', function(e) {
									e.preventDefault();
									$feature.cycle('pause');
								});
								
								$navPager.find('a').each(function(i) {
									$(this).on('click', function(e) {
										$feature.cycle('pause');
									});
								});
							}
						});
					}
				}
			});
		}
	}
};

var tabs = {
	init: function() {
		var $tabs = $('.tabs');
		
		$tabs.each(function(index) {
			var $this = $(this),
				$links = $this.find('> li a'),
				$panes = $this.nextAll('.panes:first').find('> .pane'),
				tabID = 'tabid-' + window.location.pathname + '-' + index,
				tabCookie = cookie.read(tabID);
			
			if (tabCookie) {
				$links.eq(tabCookie).addClass(current);
				$panes.hide().attr(ariaHidden, true);
				$panes.eq(tabCookie).show().attr(ariaHidden, false);
			}
			else {
				$links.eq(0).addClass(current);
				$panes.not(':first').attr(ariaHidden, true);
			}
			
			$links.on('click', function(e) {
				e.preventDefault();
				
				var $this = $(this),
					idx = $this.parent().index();
				
				if (!$this.hasClass(current)) {
					$links.removeClass(current);
					$this.addClass(current);
				}
				
				$panes.hide().attr(ariaHidden, true);
				$panes.eq(idx).show().attr(ariaHidden, false);
				
				cookie.set(tabID, idx);
			});
		});
	}
};

var accordion = {
	init: function() {
		var $accordion = $('.accordion');
		if ($accordion.length) {
			$accordion.each(function(index) {
				var $this = $(this),
					$accordionLinks = $this.find('> ul > li > a'),
					$accordionContent = $this.find($('.accordion_content')),
					accordionID = 'accordionid-' + window.location.pathname + '-' + index,
					accordionCookie = cookie.read(accordionID);
				
				$accordionContent.attr(ariaHidden, true);
				
				$accordionLinks.each(function(idx) {
					var $this = $(this);
					
					if (accordionCookie) {
						if (parseInt(accordionCookie) === idx) {
							$accordionLinks.removeClass(open);
							$this.addClass(open);
							$accordionContent.eq(idx).attr(ariaHidden, false);
						}
					}
					else {
						if ($this.hasClass(open)) {
							$accordionContent.eq(idx).attr(ariaHidden, false);
							cookie.set(accordionID, idx);
						}
					}						
					
					$this.on('click', function(e) {
						e.preventDefault();
						$accordionContent.attr(ariaHidden, true);
						$accordionLinks.removeClass(open);
						
						var $this = $(this);
						
						$this.addClass(open);
						$this.next().attr(ariaHidden, false);
												
						cookie.set(accordionID, idx);
					});
				});				
			});
		}
	}
};

})();