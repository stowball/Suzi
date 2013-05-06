(function() {

$(document).ready(function(e) {
	$html.addClass('jquery');
	
	if (layoutEngine.vendor === 'mozilla' && cssua.ua.desktop === 'windows')
		Modernizr.load('/js/jquery.firefox.hwa.min.js');
	
	$('img.rwd').rwdImages({
		display: 'block'
	});
	
	placeholder.init();
	tables.init();
	forms.init();
	slider.init();
	
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

var requiredFields = [];

var forms = {
	init: function() {
		var $forms = $('form');
		$forms.each(function(idx) {
			var $this = $(this);
			requiredFields[idx] = $this.find('[required]');
			$this.on('submit', function() {
				return forms.validate($this, idx);
			});
		});
	},
	validate: function(form, idx) {
		var $requireds = $(requiredFields[idx]),
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
					slidesCount = $slides.length;
				
				if (slidesCount > 1) {
					var li = '',
						interval = false,
						nav = true;
						pager = true;
						
					if (!supports.touch && parseInt($this.data('interval')))
						interval = parseInt($this.data('interval')*1000);
					
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
						var slider = new Swipe($feature[0], {
							callback: function(e, pos) {
								$slides.attr(ariaHidden, true);
								$slides.filter(':eq(' + pos + ')').attr(ariaHidden, false);
								
								if (pager) {
									$navPagerLi.removeClass(current);
									$navPagerLi.filter(':eq(' + pos + ')').addClass(current);
								}
								
								if (!interval)
									trackEvent('Website', 'Carousel', 'Slide ' + (pos+1));
							}
						});
						
						$slides.filter(':not(:first-child)').attr(ariaHidden, true);
						
						if (pager)
							$navPagerLi.filter(':first-child').addClass(current);
						
						$this.addClass('swipejs');
	
						if (nav) {
							$navPrev.on('click', function(e) {
								e.preventDefault();
								slider.prev();
								if (interval) {
									window.clearTimeout(timer);
									interval = false;
								}
							});
							
							$navNext.on('click', function(e) {
								e.preventDefault();
								slider.next();
								if (interval) {
									window.clearTimeout(timer);
									interval = false;
								}
							});
						}
						
						if (pager) {
							$navPagerA.each(function(idx) {
								var i = idx;
								$(this).on('click', function(e) {
									e.preventDefault();
									slider.slide(i);
									$navPagerLi.removeClass(current);
									$(this).parent().addClass(current);
									if (interval) {
										window.clearTimeout(timer);
										interval = false;
									}
								});
							});
						}
						
						var carousel = function() {
							slider.next();
						};
						
						if (interval) {
							timer = window.setInterval(carousel, interval);
							var $tileA = $this.find('.tile a');
							
							$this.find($tileA).hover(
								function(e) {
									e.stopPropagation();
									if (interval)
										window.clearTimeout(timer);
								},
								function(e) {
									e.stopPropagation();
									if (interval)
										timer = window.setInterval(carousel, interval);
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
								timeout: interval,
								after: function(curr, next, opts) {
									var idx = opts.currSlide
									$slides.attr(ariaHidden, true);
									$slides.filter(':eq(' + idx + ')').attr(ariaHidden, false);
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
								return '<li><a href="#slide-' + (idx+1) + '">Slide ' + (idx+1) + '</a></li>';
							}
						}
						
						$feature.attr('style', w);
						$feature.find('li').attr('style', w);
						
						Modernizr.load({
							load: '/js/jquery.cycle.all.min.js',
							complete: function() {
								$feature.cycle(cycleOpts);
							}
						});
					}
				}
			});
		}
	}
};

})();