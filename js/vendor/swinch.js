/*!
 * swinch v0.1.0
 *
 * A lightweight, customisable, horizontal touch detection script
 *
 * Copyright (c) 2014 Matt Stow
 *
 * http://mattstow.com
 *
 * Licensed under the MIT license
*/
;window.swinch = function(elem, options) {
	if (!elem)
		return;
	
	this.options = options || {};
	this.thresholdDuration = this.options.thresholdDuration || 50;
	this.thresholdDistance = this.options.thresholdDistance || 30;
	this.onMove = this.options.onMove || function() {};
	this.onEnd = this.options.onEnd || function() {};
	
	if (elem.addEventListener) {
		elem.addEventListener('touchstart', this, false);
		elem.addEventListener('touchmove', this, false);
		elem.addEventListener('touchend', this, false);
		elem.addEventListener('touchcancel', this, false);
	}
};

swinch.prototype = {
	handleEvent: function(e) {
		switch (e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchcancel':
			case 'touchend': this.onTouchEnd(e); break;
		}
	},
	
	onTouchStart: function(e) {
		this.start = {
			pageX: e.touches[0].pageX,
			pageY: e.touches[0].pageY,

			time: Number(new Date())
		};

		this.isScrolling = undefined;
		this.deltaX = 0;
		
		e.stopPropagation();
	},
	
	onTouchMove: function(e) {
		if (e.touches.length > 1 || e.scale && e.scale !== 1)
			return;

		this.deltaX = e.touches[0].pageX - this.start.pageX;

		if ( typeof this.isScrolling == 'undefined') {
			this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY));
		}

		if (!this.isScrolling) {
			e.preventDefault();
			e.stopPropagation();
			
			this.onMove(this.deltaX);
		}
	},
	
	onTouchEnd: function(e) {
		var isValid = Number(new Date()) - this.start.time > this.thresholdDuration && Math.abs(this.deltaX) > this.thresholdDistance;

		if (!this.isScrolling && isValid) {
			this.onEnd(this.deltaX < 0 ? 'left' : 'right');
		}

		e.stopPropagation();
	}
};