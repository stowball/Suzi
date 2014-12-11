(function(window, document) {

$(document).ready(function(e) {
	$html.addClass('jquery');
	
	FastClick.attach(document.body);
	
	grid.init();
	placeholder.init();
	forms.init();
	slider.init();
	tabs.init();
	accordion.init();
	tables.init();
	
	
});

var html = document.documentElement,
	$html = $(html),
	$window = $(window),
	actualFontSize = 16,
	baseFontSize = 16,
	multiplier;

var trackEvent = function(campaign, action, label) {
	var clean = function(str) {
		return str.toString().replace(/\s|'|"/g, '-');
	};
	
	if (typeof(_gaq) !== 'undefined')
		_gaq.push(['_trackEvent', clean(campaign), clean(action), clean(label)]);
};

var viewportSize = {
	height: function() {
		return html.clientHeight ? html.clientHeight : window.innerHeight;
	},
	width: function() {
		return html.clientWidth ? html.clientWidth : window.innerWidth;
	},
	multiplier: function() {
		if (window.getComputedStyle)
			actualFontSize = parseInt(window.getComputedStyle(html).getPropertyValue('font-size'));
		
		return actualFontSize / baseFontSize;
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

var grid = {
	init: function() {
		if (window.location.search.match(/suzigrid=true/g))
			yepnope(window.suzi.jsVendorPath + 'suzi.grid.js');
	}
};

var placeholder = {
	init: function() {
		if (!Modernizr.placeholder) {
			$('[placeholder]').each(function() {
				var $this = $(this),
					attr = this.getAttribute('placeholder');
				
				$this.focus(function() {
					if (this.value === attr) {
						$this.removeClass('placeholder')[0].value = '';
					}
				}).blur(function() {
					if (this.value.length === 0 || this.value === attr) {
						$this.addClass('placeholder')[0].value = attr;
					}
				}).blur();
				
				$this.parents('form').on('submit', function() {
					if ($this[0].value === attr) {
						$this[0].value = '';
					}
				});
			});
			
			$html.addClass('placeholder');
		}
	}
};

var forms = {
	requiredFields: [],
	
	init: function() {
		$('form').each(function(index) {
			var $this = $(this);
			forms.requiredFields[index] = $this.find('[required]');
			
			$this.on('submit', function() {
				return forms.validate($this, index);
			});
		});
	},
	
	validate: function(form, index) {
		var $requireds = $(forms.requiredFields[index]),
			errors = false;
		
		$requireds.removeClass('form_error').removeClass('tested');
		
		$requireds.each(function() {
			var $this = $(this);
			
			if ($this.is('[type="radio"], [type="checkbox"]') && !$this.hasClass('tested')) {
				var name = $this.attr('name'),
					$radioChecks = $requireds.filter('[name="' + name + '"]');
				
				if (!$radioChecks.is(':checked'))
					$radioChecks.addClass('form_error');
				
				$radioChecks.addClass('tested');
			}
			
			if ($.trim($this.val()).length === 0) {
				$this.addClass('form_error');
				errors = true;
			}
		});
		
		$requireds.filter('.form_error:first').focus();
		
		return !errors;
	}
};

var slider = {
	swipejs: Modernizr.csstransforms3d || layoutEngine.vendor === 'opera',
	
	init: function() {
		var $sliderParent = $('.carousel');
		
		if ($sliderParent.length === 0)
			return;
		
		$sliderParent.each(function(index) {
			var $this = $(this),
				$slider = $this.find('.slider'),
				$slides = $slider.find('> li'),
				slidesCount = $slides.length,
				$imagesLazy,
				globalPos = 0,
				isComplete = false,
				isVisible = false,
				carouselID = 'carouselid-' + window.location.pathname + '-' + index,
				carouselHasCookie = $this.data('cookie'), 
				carouselCookie = carouselHasCookie ? cookie.read(carouselID) : 0,
				circular = $this.data('circular');
			
			if ($slider.length === 0 || $slides.length === 0)
				return;
			
			if (slider.swipejs && circular) {
				$slides.eq(0).clone().appendTo($slider);
				$slides.eq(slidesCount - 1).clone().prependTo($slider);
				$slides = $slider.find('> li'),
				slidesCount = slidesCount + 2;
			}
			
			if (carouselHasCookie)
				globalPos = parseInt(carouselCookie);
			
			if (slider.swipejs && circular && globalPos === 0)
				globalPos = 1;
			
			$imagesLazy = $slides.find('.rwdimage');
			
			if (slidesCount === 1) {
				globalPos = 0;
				slider.lazyLoad($imagesLazy, globalPos);
				
				var $feature = $this.find('.inner');
				
				$slides.css('visibility', 'visible');
				$feature.css('visibility', 'visible');
			}
			else {
				var li = '',
					interval = parseInt($this.data('interval') * 1000) || 0,
					counter = $this.data('counter'),
					pager = $this.data('pager'),
					thumbnails = $this.data('pager-thumbnails'),
					nav = $this.data('nav'),
					speed = parseInt($this.data('speed')) || 500;
				
				var loadAdditional = function(pos, globalPos, slidesCount) {
					slider.lazyLoad($imagesLazy, pos);
					
					if (pos > globalPos) {
						if (pos < slidesCount - 1) {
							slider.lazyLoad($imagesLazy, pos + 1);
							
							if (circular && pos === slidesCount - 2 && globalPos === 1) {
								slider.lazyLoad($imagesLazy, pos - 1);
							}
						}
						else if (pos === slidesCount - 1 && globalPos === 0) {
							slider.lazyLoad($imagesLazy, pos - 1);
						}
						else {
							slider.lazyLoad($imagesLazy, 0);
						}
					}
					else if (pos < globalPos) {
						if (pos === 0) {
							if (globalPos > 1)
								slider.lazyLoad($imagesLazy, pos + 1);
							else
								slider.lazyLoad($imagesLazy, pos - 1);
						}
						else if (circular && pos === 1) {
							slider.lazyLoad($imagesLazy, pos - 1);
						}
						else if (pos > 1) {
							slider.lazyLoad($imagesLazy, pos - 1);
						}
						else {
							slider.lazyLoad($imagesLazy, 0);
						}
					}
				};
				
				slider.lazyLoad($imagesLazy, globalPos, globalPos, slidesCount);
				
				if (counter) {
					var $slideCounter = $('<div class="carousel_counter" />');
					$this.append($slideCounter);
					
					var updateSlideCounter = function(slideIndex) {
						$slideCounter[0].innerHTML = (slider.swipejs && circular ? slideIndex : slideIndex + 1) + '/' + (slider.swipejs && circular ? slidesCount - 2 : slidesCount);
					}
				}
				
				if (pager) {
					var $navPager = $('<ul class="carousel_nav_pager' + (thumbnails ? ' carousel_nav_pager--thumbnails' : '') + ' reset menu" />');
					$this.append($navPager);
				}
				
				if (nav) {
					var $navContainer = $('<div class="carousel_nav" />'),
						$navPrev = $('<a href="#previous" class="carousel_nav_item carousel_nav_item--prev"><span>Previous</span></a>'),
						$navNext = $('<a href="#next" class="carousel_nav_item carousel_nav_item--next"><span>Next</span></a>');
					
					$navContainer.append($navPrev).append($navNext)
					$this.append($navContainer);
				}
				
				if (slider.swipejs) {
					var hasResizeClass = false,
						resizeSwipe = function() {
							$html.removeClass('window_is_resizing');
							hasResizeClass = false;
						};
					
					$window.resize(function() {
						clearTimeout(window.resizeTimer);
						
						if (!hasResizeClass) {
							$html.addClass('window_is_resizing');
							hasResizeClass = true;
						}
						
						window.resizeTimer = setTimeout(resizeSwipe, 250);
					});
					
					if (pager) {
						for (var i = 1; i <= slidesCount; i++) {
							if (thumbnails)
								li += '<li class="reset carousel_nav_pager_item"><a href="#slide-' + i + '">' + ($slides.eq(i - 1).data('pager-thumbnail') ? '<img src="' + $slides.eq(i - 1).data('pager-thumbnail') + '" alt="Slide ' + i + '" />' : 'Slide ' + i) + '</a></li>';
							else
								li += '<li class="reset carousel_nav_pager_item"><a href="#slide-' + i + '">Slide ' + i + '</a></li>';
						}
						
						$navPager.append(li);
						var $navPagerLi = $navPager.find('li'),
							$navPagerA = $navPager.find('a');
						
						if (circular) {
							$navPagerLi.eq(0).hide();
							$navPagerLi.eq(slidesCount - 1).hide();
						}
					}
					
					var $feature = $this.find('.inner');
					
					var carousel = new Swipe($feature[0], {
						circular: circular,
						speed: speed,
						
						complete: function() {
							this.slide(globalPos);
							isComplete = true;
							
							if (layoutEngine.vendor === 'webkit' && cssua.ua.safari) {
								window.setTimeout(function() {
									isVisible = true;
									$slides.css('visibility', 'visible');
									$feature.css('visibility', 'visible');
								}, speed + 1);
							}
						},
						
						touchCallback: function() {
							stopCarousel();
						},
						
						callback: function(e, pos) {
							if (isComplete && !isVisible) {
								isVisible = true;
								$slides.css('visibility', 'visible');
								$feature.css('visibility', 'visible');
							}
							
							$slides
								.attr('aria-hidden', true)
								.eq(pos)
								.attr('aria-hidden', false);
							
							loadAdditional(pos, globalPos, slidesCount);
							
							if (pager) {
								$navPagerLi
									.removeClass('carousel_nav_pager_item--is_current')
									.eq(pos).addClass('carousel_nav_pager_item--is_current');
							}
							
							if (counter)
								updateSlideCounter(pos);
							
							if (!interval)
								trackEvent('Website', 'Carousel', 'Slide ' + (pos + 1));
							
							globalPos = pos;
							
							if (carouselHasCookie)
								cookie.set(carouselID, globalPos);
						}
					});
					
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
							var $this = $(this),
								$parent = $this.parent();
							
							$this.on('click', function(e) {
								e.preventDefault();
								
								slider.lazyLoad($imagesLazy, idx);
								carousel.slide(idx);
								
								$navPagerLi.removeClass('carousel_nav_pager_item--is_current');
								$parent.addClass('carousel_nav_pager_item--is_current');
								
								stopCarousel();
							});
						});
					}
					
					var autoCarousel = function() {
						carousel.next();
					};
					
					if (interval) {
						var timer = window.setInterval(autoCarousel, interval),
							$tile = $this.find('.carousel_tile');
						
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
						widthOverride = 'width: 100% !important',
						
						cycleOpts = {
							activePagerClass: 'carousel_nav_pager_item--is_current',
							cleartypeNoBg: true,
							easing: 'easeInOutQuint',
							fx: 'scrollHorz',
							pause: true,
							speed: speed,
							startingSlide: globalPos,
							timeout: interval,
							after: function(curr, next, opts) {
								var pos = opts.currSlide;
								
								$slides
									.attr('aria-hidden', true)
									.eq(pos)
									.attr('aria-hidden', false);
								
								loadAdditional(pos, globalPos, slidesCount);
								
								if (counter)
									updateSlideCounter(pos);
								
								globalPos = pos;
								
								if (carouselHasCookie)
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
							if (thumbnails)
								return '<li><a href="#slide-' + (idx + 1) + '">' + ($slides.eq(idx).data('pager-thumbnail') ? '<img src="' + $slides.eq(idx).data('pager-thumbnail') + '" alt="Slide ' + (idx + 1) + '" />' : 'Slide ' + (idx + 1)) + '</a></li>';
							else
								return '<li><a href="#slide-' + (idx + 1) + '">Slide ' + (idx + 1) + '</a></li>';
						};
					}
					
					$feature.attr('style', widthOverride);
					$slides.attr('style', widthOverride);
					
					yepnope({
						load: [window.suzi.jsVendorPath + '_bundle.jquery.cycle.js'],
						complete: function() {
							$feature
								.cycle(cycleOpts)
								.css('visibility', 'visible');
							
							$slides.css('visibility', 'visible');
							
							if (nav) {
								$navPrev.on('click', function(e) {
									e.preventDefault();
									$feature.cycle('pause');
								});
								
								$navNext.on('click', function(e) {
									e.preventDefault();
									$feature.cycle('pause');
								});
							}
							
							if (pager) {
								$navPager.css('z-index', slidesCount + 1).find('a').each(function(i) {
									$(this).on('click', function(e) {
										slider.lazyLoad(slider.$imagesLazy[index].eq(i));
										$feature.cycle('pause');
									});
								});
							}
						}
					});
				}
			}
		});
	},
	
	lazyLoad: function($imagesLazy, index, globalPos, slidesCount) {
		var $this = $($imagesLazy[index]);
		
		if ($this.length === 0 || $this.hasClass('lazy-loaded'))
			return;
		
		$this.addClass('lazy-loaded');
		window.rwdImageChangeSrc($imagesLazy[index]);
		
		var loadAdditional = function() {
			$this.addClass('has-lazy-loaded');
			
			if (slidesCount) {
				if (globalPos === 0) {
					slider.lazyLoad($imagesLazy, globalPos + 1);
					slider.lazyLoad($imagesLazy, slidesCount - 1);
				}
				else if (globalPos === slidesCount - 1) {
					slider.lazyLoad($imagesLazy, 0);
					slider.lazyLoad($imagesLazy, globalPos - 1);
				}
				else {
					slider.lazyLoad($imagesLazy, globalPos + 1);
					slider.lazyLoad($imagesLazy, globalPos - 1);
				}
			}
		};
		
		var src = !!window.getComputedStyle ? window.getComputedStyle($this[0]).getPropertyValue('background-image') : $this[0].currentStyle.backgroundImage,
			img = new Image();
		
		src = src.replace(/url\((?:\"?)(.*?)(?:\"?)\)/, '$1');
		
		if (src !== 'none') {
			img.onload = loadAdditional;
			
			img.src = src;
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
				tabHasCookie = $this.data('cookie'), 
				tabCookie = tabHasCookie ? cookie.read(tabID) : 0;
			
			if (tabHasCookie) {
				$links.eq(tabCookie).addClass('tab--is_current');
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(tabCookie).show().attr('aria-hidden', false);
			}
			else {
				$links.eq(0).addClass('tab--is_current');
				$panes.not(':first').attr('aria-hidden', true);
			}
			
			$links.on('click', function(e) {
				e.preventDefault();
				
				var $this = $(this),
					idx = $this.parent().index();
				
				if (!$this.hasClass('tab--is_current')) {
					$links.removeClass('tab--is_current');
					$this.addClass('tab--is_current');
				}
				
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(idx).show().attr('aria-hidden', false);
				
				if (tabHasCookie)
					cookie.set(tabID, idx);
				
				trackEvent('Website', 'Tabs', tabID + '-' + idx);
			});
		});
	}
};

var transition = {
	storeInitial: function($elem) {
		if (window.getComputedStyle) {
			var transitionDuration = window.getComputedStyle($elem[0]).getPropertyValue('transition-duration') || window.getComputedStyle($elem[0]).getPropertyValue('-webkit-transition-duration'),
				transitionTimingFunction = window.getComputedStyle($elem[0]).getPropertyValue('transition-timing-function') || window.getComputedStyle($elem[0]).getPropertyValue('-webkit-transition-timing-function');
			
			if (transitionDuration.match(/\d+s$/g))
				transitionDuration = parseFloat(transitionDuration) * 1000;
			else
				transitionDuration = parseInt(transitionDuration);
			
			$elem.attr('aria-hidden', true).data('transition-duration', transitionDuration).data('transition-timing-function', transitionTimingFunction);
		}
	},
	
	overrideDefault: function(selector) {
		if (window.getComputedStyle) {
			var style = document.createElement('style');
			style.appendChild(document.createTextNode('.jquery ' + selector.replace(/,/g, ',.jquery ') + '{ -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'));
			document.head.appendChild(style);
		}
	}
};

var accordion = {
	init: function() {
		var $accordion = $('.accordion');
		
		if ($accordion.length === 0)
			return;
		
		$accordion.each(function(index) {
			var $this = $(this),
				$accordionLinks = $this.find('> ul > li > .accordion_toggler'),
				$accordionContent = $this.find('> ul > li > .accordion_content'),
				multiple = $this.data('multiple'),
				accordionID = 'accordionid-' + window.location.pathname + '-' + index,
				accordionHasCookie = multiple ? false : $this.data('cookie'), 
				accordionCookie = accordionHasCookie ? cookie.read(accordionID) : 0;
			
			if ($accordionLinks.length === 0)
				return;
			else if ($accordionLinks.length === 1)
				multiple = true;
			
			$accordionContent.each(function() {
				transition.storeInitial($(this));
			});
			
			$accordionLinks.each(function(idx) {
				var $this = $(this),
					$accordionContentIndex = $accordionContent.eq(idx);
				
				if (!multiple || accordionHasCookie) {
					if (!accordionHasCookie) {
						if ($this.hasClass('accordion_toggler--to_open'))
							accordionCookie = idx;
					}
					
					if (parseInt(accordionCookie) === idx) {
						$accordionLinks.removeClass('accordion_toggler--is_open');
						$accordionContent.attr('aria-hidden', true).css('height', '0');
						
						$this.addClass('accordion_toggler--is_open');
						
						$accordionContentIndex.attr('aria-hidden', false).css('height', 'auto');
					}
				}
				else {
					if ($this.hasClass('accordion_toggler--to_open')) {
						$this.removeClass('accordion_toggler--to_open').addClass('accordion_toggler--is_open');
						
						$accordionContentIndex.attr('aria-hidden', false).css('height', 'auto');
						
						if (!multiple && accordionHasCookie)
							cookie.set(accordionID, idx);
					}
				}
				
				$this.on('click', function(e) {
					e.preventDefault();
					
					var $this = $(this),
						$accordionContentSibling = $this.next(),
						transitionPropertyValue = 'auto',
						transitionDuration = $accordionContentSibling.data('transition-duration'),
						transitionTimingFunction = $accordionContentSibling.data('transition-timing-function'),
						ariaHidden = false;
					
					if (!multiple) {
						$accordionLinks.removeClass('accordion_toggler--to_open accordion_toggler--is_open');
						
						$accordionContent.each(function(index) {
							if (index === idx)
								$(this).attr('aria-hidden', false).transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
							else
								$(this).attr('aria-hidden', true).transition({height: 0}, transitionDuration, transitionTimingFunction);
						});
						
						$this.addClass('accordion_toggler--is_open');
					}
					else {
						$this.toggleClass('accordion_toggler--is_open');
						
						if ($accordionContentSibling.attr('aria-hidden') == 'false') {
							ariaHidden = true;
							transitionPropertyValue = 0;
						}
						
						$accordionContentSibling.attr('aria-hidden', ariaHidden).transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
					}
					
					if (!multiple && accordionHasCookie) {
						cookie.set(accordionID, idx);
						trackEvent('Website', 'Accordions', accordionID + '-' + idx);
					}
				});
			});
		});
		
		transition.overrideDefault('.accordion_content');
	}
};

var tables = {
	init: function() {
		if (layoutEngine.vendor === 'ie' && layoutEngine.version === 9)
			this.gridFix();
	},
	
	gridFix: function() {
		$('.data_table').each(function() {
			$(this).append('<tr class="ie9_grid_dummy"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		});
	}
};

})(window, document);