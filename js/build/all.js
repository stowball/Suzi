/*!
 * Class Query v0.2.0
 *
 * Creates media queries from .classquery- classes for elements with data-classquery attributes
 *
 * Copyright (c) 2013 Matt Stow
 *
 * http://mattstow.com
 *
 * Licensed under the MIT license
*/
;(function(b){function F(k,l){var R=k.cssRules?k.cssRules:k.media,Q,S=[],m=R.length;for(var j=0;j<m;j++){Q=R[j];if(l(Q)){S.push(Q)}}return S}function a(i){return F(i,function(j){if(!j.selectorText){return false}else{if(j.selectorText.indexOf(".classquery-")===0){return true}else{return false}}})}function t(j){var k=window.location,i=b.createElement("a");i.href=j;return i.hostname===k.hostname&&i.protocol===k.protocol}function o(i){return !i.ownerNode?false:i.ownerNode.constructor===HTMLStyleElement}function u(i){return i.href&&t(i.href)}function B(){var Q=b.styleSheets,k,m=Q.length,j=0,l=[];for(j;j<m;j++){k=Q[j];if(u(k)||o(k)){l.push(k)}}return l}var A=b.documentElement,w="classquery",q=b.querySelectorAll("[data-"+w+"]"),s=q.length;if(s===0){return}var g=B(),r=g.length,e=[];for(var O=0;O<r;O++){e=e.concat(a(g[O]))}if(e.length===0){return}A.className+=" "+w+"-init";var z=w+"-id",d=e.length,h,P,n,x,H,f,N,c,C,v,y,p,D,E,I,G="";for(var M=0;M<s;M++){h=q[M];h.setAttribute("data-"+z,M);P=h.getAttribute("data-"+w).split(";");n=P.length;x=h.getAttribute("class")?"."+h.getAttribute("class").replace(/\s+/g,"."):"";H=h.getAttribute("id")?"#"+h.getAttribute("id"):"";for(var L=0;L<n;L++){f=P[L].split(",");N=f.length;for(var K=0;K<d;K++){for(var J=0;J<N;J++){f[J]=f[J].trim();if(J%2===1&&e[K].selectorText.indexOf(f[J])>-1){c=e[K].selectorText.replace(/\[/g,"\\[").replace(/\]/g,"\\]").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\*/g,"\\*").replace(/\+/g,"\\+").replace(/\^/g,"\\^").replace(/\$/g,"\\$")+"\\s*?{";C=new RegExp(c,"g");v="("+f[J]+")(.*?)(,|{)";y=new RegExp(v);p="[data-"+z+'="'+M+'"]'+x+H+c.match(y)[2].replace("s*?","").replace(/\\/g,"");G+="@media "+f[J-1]+"{"+p+" {"+e[K].cssText.replace(C,"")+"}\n"}}}}}I=b.createElement("style");I.appendChild(b.createTextNode(G));b.head.appendChild(I);A.className=A.className.replace(w+"-init",w+"-complete")})(document);
/*
* rwdImages jQuery plugin v1.4
*
* Allows responsive content images using the redux spacer technique (http://mattstow.com/experiment/responsive-images-redux/responsive-images-redux-jquery-plugin.html) to be shared and saved
*
* Copyright (c) 2013 Matt Stow
* http://mattstow.com
* Licensed under the MIT license
*/
;(function(a){a.fn.rwdImages=function(n){var e=a.extend({display:"inline-block",zindex:false},n);var h=a(this),c=document.documentElement.style,k="behavior" in c&&"widows" in c&&!("fill" in c)?true:false,l=navigator.appVersion.indexOf("MSIE 7")!=-1?true:false,i="display:"+e.display+"; max-width:100%; position:relative;",j="";if(h.length>0){var m="background-image",b=/(url\("?)(.*?)("?\))/gi,g="src",d="rwd-swap",f;if(e.zindex){i+=" z-index:"+e.zindex}if(k){j='-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";'}a("head").append("<style>."+d+"{height:100%;left:0;opacity:0;"+j+"position:absolute;top:0;width:100%}</style>");h.each(function(){var q=a(this),o,p=q.css(m);if(p.match(b)){o=p.replace(b,"$2")}if(!l){q.wrap('<span class="rwd-wrap" style="'+i+'" />').clone().removeClass(h.attr("class")).addClass(d).appendTo(q.parent()).attr(g,o)}else{q.attr(g,o).css("background-image","none").wrap('<span class="rwd-wrap" style="'+i+'" />')}});if(!l){f=a("img."+d);a(window).resize(function(){f.each(function(){var r=a(this),o=r.prev(),p,q=o.css(m);if(q.match(b)){r.attr(g,q.replace(b,"$2"))}})})}}return this}})(jQuery);
/*!
 * Swipe 1.0.6
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
*/
;window.Swipe=function(b,a){if(!b){return null}var c=this;this.options=a||{};this.index=this.options.startSlide||0;this.oldIndex=this.index;this.speed=this.options.speed||300;this.complete=this.options.complete||function(){};this.callback=this.options.callback||function(){};this.touchCallback=this.options.touchCallback||function(){};this.circular=this.options.circular||false;this.hasEnded=false;this.container=b;this.element=this.container.children[0];this.container.style.overflow="hidden";this.element.style.listStyle="none";this.element.style.margin=0;this.setup();this.begin();if(this.element.addEventListener){this.element.addEventListener("touchstart",this,false);this.element.addEventListener("touchmove",this,false);this.element.addEventListener("touchend",this,false);this.element.addEventListener("touchcancel",this,false);this.element.addEventListener("webkitTransitionEnd",this,false);this.element.addEventListener("msTransitionEnd",this,false);this.element.addEventListener("oTransitionEnd",this,false);this.element.addEventListener("transitionend",this,false);window.addEventListener("resize",this,false)}};Swipe.prototype={setup:function(){this.slides=this.element.children;this.length=this.slides.length;if(this.length<2){return null}this.width=Math.ceil(("getBoundingClientRect" in this.container)?this.container.getBoundingClientRect().width:this.container.offsetWidth);if(!this.width){return null}this.container.style.visibility="hidden";this.element.style.width=Math.ceil(this.slides.length*this.width)+"px";var a=this.slides.length;while(a--){var b=this.slides[a];b.style.width=this.width+"px";b.style.display="table-cell";b.style.verticalAlign="top"}this.complete(this.index,this.slides[this.index])},slide:function(a,c){if(!this.hasEnded){if(this.oldIndex===this.length-2&&this.index===this.length-1&&a===0){this.slide(2);return}else{if(this.oldIndex===1&&this.index===0&&a===this.length-1){this.slide(this.length-3);return}}}var b=this.element.style;if(c==undefined){c=this.speed}b.webkitTransitionDuration=b.MozTransitionDuration=b.msTransitionDuration=b.OTransitionDuration=b.transitionDuration=c+"ms";b.MozTransform=b.webkitTransform="translate3d("+-(a*this.width)+"px,0,0)";b.msTransform=b.OTransform="translateX("+-(a*this.width)+"px)";this.oldIndex=this.index;this.index=a;this.hasEnded=false},getPos:function(){return this.index},prev:function(){if(this.index){this.slide(this.index-1,this.speed)}else{this.slide(this.length-1,this.speed)}},next:function(){if(this.index<this.length-1){this.slide(this.index+1,this.speed)}else{this.slide(0,this.speed)}},begin:function(){var a=this},resume:function(){this.begin()},handleEvent:function(a){switch(a.type){case"touchstart":this.onTouchStart(a);break;case"touchmove":this.onTouchMove(a);break;case"touchcancel":case"touchend":this.onTouchEnd(a);break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"transitionend":this.transitionEnd(a);break;case"resize":this.setup();break}},transitionEnd:function(a){if(a.target.className.indexOf("slider")<0){return}this.hasEnded=true;if(this.circular){if(this.index===this.length-1&&this.oldIndex>0){this.slide(1,0)}else{if(this.index===0){this.slide(this.length-2,0)}}}this.callback(a,this.index,this.slides[this.index])},onTouchStart:function(a){this.start={pageX:a.touches[0].pageX,pageY:a.touches[0].pageY,time:Number(new Date())};this.isScrolling=undefined;this.deltaX=0;this.element.style.MozTransitionDuration=this.element.style.webkitTransitionDuration=this.element.style.transitionDuration=0;this.element.style.MozTransitionTimingFunction=this.element.style.OTransitionTimingFunction=this.element.style.webkitTransitionTimingFunction=this.element.style.transitionTimingFunction="linear";a.stopPropagation()},onTouchMove:function(a){if(a.touches.length>1||a.scale&&a.scale!==1){return}this.deltaX=a.touches[0].pageX-this.start.pageX;if(typeof this.isScrolling=="undefined"){this.isScrolling=!!(this.isScrolling||Math.abs(this.deltaX)<Math.abs(a.touches[0].pageY-this.start.pageY))}if(!this.isScrolling){a.preventDefault();this.deltaX=this.deltaX/((!this.index&&this.deltaX>0||this.index==this.length-1&&this.deltaX<0)?(Math.abs(this.deltaX)/this.width+1):1);this.element.style.MozTransform=this.element.style.webkitTransform="translate3d("+(this.deltaX-this.index*this.width)+"px,0,0)";a.stopPropagation()}},onTouchEnd:function(c){var b=Number(new Date())-this.start.time<250&&Math.abs(this.deltaX)>20||Math.abs(this.deltaX)>this.width/2,a=!this.index&&this.deltaX>0||this.index==this.length-1&&this.deltaX<0;if(!this.isScrolling){this.slide(this.index+(b&&!a?(this.deltaX<0?1:-1):0),300);this.touchCallback()}c.stopPropagation()}};
/*!
* Firefox Detect Hardware Acceleration plugin v0.3
*
* Detects whether hardware acceleration is in use in Firefox and adds a class of "hwa" or "no-hwa" class to the html tag where appropriate
* Requires LayoutEngine and CssUserAgent
*
* Copyright (c) 2013 Izilla Partners Pty Ltd
* http://izilla.com.au
* Licensed under the MIT license
*/
;(function(f,g,d){if(!(layoutEngine.vendor==="mozilla"&&cssua.ua.desktop==="windows")){return}function k(l){var m="hwa";if(l){m=l+m}g.documentElement.className+=" "+m}var i=g.createElement("div"),h=g.createElement("div"),a="bottom: 0; line-height: normal; position: absolute; visibility: hidden; font-family: Arial; font-size: ",j="no-";i.appendChild(g.createTextNode("1"));h.appendChild(g.createTextNode("2"));i.setAttribute("style",a+"20px");h.setAttribute("style",a+"35px");d.appendChild(i);d.appendChild(h);var b=parseFloat(f.getComputedStyle(i).getPropertyValue("font-size")),e=parseFloat(i.offsetHeight),c=parseFloat(h.offsetHeight);d.removeChild(i);d.removeChild(h);if(b===20){if(e===25&&c===41){k()}else{if(e===25&&c===40){k(j)}else{if(e===25&&c===42){k()}else{if(e===24&&c===40){k(j)}else{if(e===23&&c===40){k(j)}else{if(e===24&&c===41){k(j)}else{if(e===24&&c===42){k()}else{k(j)}}}}}}}}else{if(b===16){if(e===20){k()}else{k(j)}}else{if(b===17.9833){if(c===38){k()}else{k(j)}}else{if(b===22){if(c===46){k()}else{k(j)}}else{if(b===24){if(e===29){k()}else{k(j)}}else{if(b===26.6){if(e===32){k()}else{k(j)}}else{k(j)}}}}}}})(window,document,document.body);
function FastClick(b){var c,a=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=b;if(!b||!b.nodeType){throw new TypeError("Layer must be a document node")}this.onClick=function(){return FastClick.prototype.onClick.apply(a,arguments)};this.onMouse=function(){return FastClick.prototype.onMouse.apply(a,arguments)};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(a,arguments)};this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(a,arguments)};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(a,arguments)};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(a,arguments)};if(FastClick.notNeeded(b)){return}if(this.deviceIsAndroid){b.addEventListener("mouseover",this.onMouse,true);b.addEventListener("mousedown",this.onMouse,true);b.addEventListener("mouseup",this.onMouse,true)}b.addEventListener("click",this.onClick,true);b.addEventListener("touchstart",this.onTouchStart,false);b.addEventListener("touchmove",this.onTouchMove,false);b.addEventListener("touchend",this.onTouchEnd,false);b.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){b.removeEventListener=function(e,g,d){var f=Node.prototype.removeEventListener;if(e==="click"){f.call(b,e,g.hijacked||g,d)}else{f.call(b,e,g,d)}};b.addEventListener=function(f,g,e){var d=Node.prototype.addEventListener;if(f==="click"){d.call(b,f,g.hijacked||(g.hijacked=function(h){if(!h.propagationStopped){g(h)}}),e)}else{d.call(b,f,g,e)}}}if(typeof b.onclick==="function"){c=b.onclick;b.addEventListener("click",function(d){c(d)},false);b.onclick=null}}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled){return true}break;case"input":if((this.deviceIsIOS&&a.type==="file")||a.disabled){return true}break;case"label":case"video":return true}return(/\bneedsclick\b/).test(a.className)};FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case"textarea":return true;case"select":return !this.deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return !a.disabled&&!a.readOnly;default:return(/\bneedsfocus\b/).test(a.className)}};FastClick.prototype.sendClick=function(b,c){var a,d;if(document.activeElement&&document.activeElement!==b){document.activeElement.blur()}d=c.changedTouches[0];a=document.createEvent("MouseEvents");a.initMouseEvent(this.determineEventType(b),true,true,window,1,d.screenX,d.screenY,d.clientX,d.clientY,false,false,false,false,0,null);a.forwardedTouchEvent=true;b.dispatchEvent(a)};FastClick.prototype.determineEventType=function(a){if(this.deviceIsAndroid&&a.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(a){var b;if(this.deviceIsIOS&&a.setSelectionRange&&a.type.indexOf("date")!==0&&a.type!=="time"){b=a.value.length;a.setSelectionRange(b,b)}else{a.focus()}};FastClick.prototype.updateScrollParent=function(b){var c,a;c=b.fastClickScrollParent;if(!c||!c.contains(b)){a=b;do{if(a.scrollHeight>a.offsetHeight){c=a;b.fastClickScrollParent=a;break}a=a.parentElement}while(a)}if(c){c.fastClickLastScrollTop=c.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(a){if(a.nodeType===Node.TEXT_NODE){return a.parentNode}return a};FastClick.prototype.onTouchStart=function(c){var a,d,b;if(c.targetTouches.length>1){return true}a=this.getTargetElementFromEventTarget(c.target);d=c.targetTouches[0];if(this.deviceIsIOS){b=window.getSelection();if(b.rangeCount&&!b.isCollapsed){return true}if(!this.deviceIsIOS4){if(d.identifier===this.lastTouchIdentifier){c.preventDefault();return false}this.lastTouchIdentifier=d.identifier;this.updateScrollParent(a)}}this.trackingClick=true;this.trackingClickStart=c.timeStamp;this.targetElement=a;this.touchStartX=d.pageX;this.touchStartY=d.pageY;if((c.timeStamp-this.lastClickTime)<200){c.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(a){var c=a.changedTouches[0],b=this.touchBoundary;if(Math.abs(c.pageX-this.touchStartX)>b||Math.abs(c.pageY-this.touchStartY)>b){return true}return false};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(a){if(a.control!==undefined){return a.control}if(a.htmlFor){return document.getElementById(a.htmlFor)}return a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(c){var e,d,b,g,f,a=this.targetElement;if(!this.trackingClick){return true}if((c.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=c.timeStamp;d=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){f=c.changedTouches[0];a=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||a;a.fastClickScrollParent=this.targetElement.fastClickScrollParent}b=a.tagName.toLowerCase();if(b==="label"){e=this.findControl(a);if(e){this.focus(a);if(this.deviceIsAndroid){return false}a=e}}else{if(this.needsFocus(a)){if((c.timeStamp-d)>100||(this.deviceIsIOS&&window.top!==window&&b==="input")){this.targetElement=null;return false}this.focus(a);if(!this.deviceIsIOS4||b!=="select"){this.targetElement=null;c.preventDefault()}return false}}if(this.deviceIsIOS&&!this.deviceIsIOS4){g=a.fastClickScrollParent;if(g&&g.fastClickLastScrollTop!==g.scrollTop){return true}}if(!this.needsClick(a)){c.preventDefault();this.sendClick(a,c)}return false};FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(a){if(!this.targetElement){return true}if(a.forwardedTouchEvent){return true}if(!a.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(a.stopImmediatePropagation){a.stopImmediatePropagation()}else{a.propagationStopped=true}a.stopPropagation();a.preventDefault();return false}return true};FastClick.prototype.onClick=function(a){var b;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(a.target.type==="submit"&&a.detail===0){return true}b=this.onMouse(a);if(!b){this.targetElement=null}return b};FastClick.prototype.destroy=function(){var a=this.layer;if(this.deviceIsAndroid){a.removeEventListener("mouseover",this.onMouse,true);a.removeEventListener("mousedown",this.onMouse,true);a.removeEventListener("mouseup",this.onMouse,true)}a.removeEventListener("click",this.onClick,true);a.removeEventListener("touchstart",this.onTouchStart,false);a.removeEventListener("touchmove",this.onTouchMove,false);a.removeEventListener("touchend",this.onTouchEnd,false);a.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(b){var a;var c;if(typeof window.ontouchstart==="undefined"){return true}c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(c){if(FastClick.prototype.deviceIsAndroid){a=document.querySelector("meta[name=viewport]");if(a){if(a.content.indexOf("user-scalable=no")!==-1){return true}if(c>31&&window.innerWidth<=window.screen.width){return true}}}else{return true}}if(b.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(a){return new FastClick(a)};if(typeof define!=="undefined"&&define.amd){define(function(){return FastClick})}else{if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}};
(function(window, document) {

$(document).ready(function(e) {
	$html.addClass('jquery');
	
	FastClick.attach(document.body);
	
	placeholder.init();
	forms.init();
	slider.init();
	tabs.init();
	accordion.init();
	tables.init();
	
	$('img.rwd').rwdImages({
		display: 'block'
	});
});

var html = document.documentElement,
	$html = $(html),
	actualFontSize = 16,
	baseFontSize = 16,
	multiplier;

var trackEvent = function(campaign, action, label) {
	var clean = function(str) {
		return str.toString().replace(/\s|'|"/g, '-');
	}
	
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

var placeholder = {
	init: function() {
		if (!Modernizr.input.placeholder) {
			var $placeholder = $('[placeholder]');
			
			$placeholder.focus(function() {
				var $input = $(this);
				if ($input.val() === $input.attr('placeholder'))
					$input.val('').removeClass('placeholder');
			}).blur(function() {
				var $input = $(this);
				if ($input.val() === '' || $input.val() === $input.attr('placeholder'))
					$input.addClass('placeholder').val($input.attr('placeholder'));
			}).blur();
			
			$placeholder.parents('form').on('submit', function() {
				$(this).find('[placeholder]').each(function() {
					var $input = $(this);
					if ($input.val() === $input.attr('placeholder'))
						$input.val('');
				});
			});
		}
		
		$html.addClass('placeholder');
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
		
		$requireds.removeClass('form_error').removeClass(tested);
		
		$requireds.each(function() {
			var $this = $(this);
			
			if ($this.is('[type="radio"], [type="checkbox"]') && !$this.hasClass(tested)) {
				var name = $this.attr('name'),
					$radioChecks = $requireds.filter('[name="' + name + '"]');
				
				if (!$radioChecks.is(':checked')) {
					$radioChecks.addClass('form_error');
					$this.attr('aria-invalid', false);
				}
				
				$radioChecks.addClass(tested);
			}
			
			if ($.trim($this.val()).length === 0) {
				$this.addClass('form_error');
				$this.attr('aria-invalid', false);
				errors = true;
			}
		});
		
		$requireds.filter('form_error' + ':first').focus();
		
		return !errors;
	}
};

var slider = {
	swipejs: Modernizr.csstransforms3d || layoutEngine.vendor === 'opera',
	$imagesLazy: [],
	
	init: function() {
		var $sliderParent = $('.carousel');
		
		if ($sliderParent.length) {
			$sliderParent.each(function(index) {
				var $this = $(this),
					$slider = $this.find('.slider'),
					$slides = $slider.find('> li'),
					slidesCount = $slides.length,
					globalPos = 0,
					isComplete = false,
					isVisible = false,
					carouselID = 'carouselid-' + window.location.pathname + '-' + index,
					carouselCookie = cookie.read(carouselID),
					circular = $this.data('circular') === false ? false : true;
				
				if (slider.swipejs && circular) {
					$slides.eq(0).clone().appendTo($slider);
					$slides.eq(slidesCount - 1).clone().prependTo($slider);
					$slides = $slider.find('> li'),
					slidesCount = slidesCount + 2;
				}
				
				if (carouselCookie)
					globalPos = parseInt(carouselCookie);
				
				if (slider.swipejs && circular && globalPos === 0)
					globalPos = 1;
				
				slider.$imagesLazy[index] = $slides.find('[data-src]');
				
				if (slidesCount === 1) {
					slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos), index, globalPos, slidesCount);
					
					var $feature = $this.find('.inner');
					
					$slides.css('visibility', 'visible');
					$feature.css('visibility', 'visible');
				}
				else {
					var li = '',
						interval = false,
						nav = true,
						pager = true,
						speed = 300;
					
					slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos), index, globalPos, slidesCount);
					
					if (parseInt($this.data('interval')))
						interval = parseInt($this.data('interval') * 1000);
					
					if ($this.data('nav') === false) {
						nav = false;
					}
					else {
						var $navPrev = $('<a href="#previous" class="carousel_nav prev"><span>Previous</span></a>'),
							$navNext = $('<a href="#next" class="carousel_nav next"><span>Next</span></a>');
					}
					
					if ($this.data('pager') === false)
						pager = false;
					else
						var $navPager = $('<ul class="carousel_nav_pager reset menu" />');
					
					if (nav)
						$this.append($navPrev).append($navNext);
					
					if (pager)
						$this.append($navPager);
					
					if (parseInt($this.data('speed')))
						speed = parseInt($this.data('speed'));
					
					$this.addClass('multiple');
					
					if (slider.swipejs) {
						
						var hasResizeClass = false,
							resizeSwipe = function() {
								$html.removeClass('resizing');
								hasResizeClass = false;
							};
						
						$(window).resize(function() {
							clearTimeout(window.resizeTimer);
							if (!hasResizeClass) {
								$html.addClass('resizing');
								hasResizeClass = true;
							}
							window.resizeTimer = setTimeout(resizeSwipe, 250);
						});
						
						if (pager) {
							for (var i = 1; i <= slidesCount; i++) {
								li += '<li><a href="#slide-' + i + '">Slide ' + i + '</a></li>';
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
								
								slider.lazyLoad(slider.$imagesLazy[index].eq(pos));
								
								if (pos > globalPos) {
									if (pos < slidesCount - 1) {
										slider.lazyLoad(slider.$imagesLazy[index].eq(pos + 1));
										if (circular && pos === slidesCount - 2 && globalPos === 1) {
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
										}
									}
									else if (pos === slidesCount - 1 && globalPos === 0)
										slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
								}
								else if (pos < globalPos) {
									if (pos === 0) {
										if (globalPos > 1)
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos + 1));
										else
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
									}
									else if (circular && pos === 1)
										slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
									else if (pos > 1) {
										slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
									}
								}
								
								if (pager) {
									$navPagerLi
										.removeClass('current')
										.eq(pos).addClass('current');
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
									
									slider.lazyLoad(slider.$imagesLazy[index].eq(i));
									carousel.slide(i);
									
									$navPagerLi.removeClass('current');
									$(this).parent().addClass('current');
									
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
							widthOverride = 'width: 100% !important',
							
							cycleOpts = {
								activePagerClass: 'current',
								cleartypeNoBg: true,
								easing: 'easeInOutQuint',
								fx: 'scrollHorz',
								pause: true,
								speed: speed,
								startingSlide: globalPos,
								timeout: interval,
								after: function(curr, next, opts) {
									var pos = opts.currSlide;
									
									slider.lazyLoad(slider.$imagesLazy[index].eq(pos));
									
									if (pos > globalPos) {
										if (pos < slidesCount - 1)
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos + 1));
										else if (pos === slidesCount - 1 && globalPos === 0)
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
									}
									else if (pos < globalPos) {
										if (pos === 0) {
											if (globalPos > 1)
												slider.lazyLoad(slider.$imagesLazy[index].eq(pos + 1));
											else
												slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
										}
										else if (pos > 1) {
											slider.lazyLoad(slider.$imagesLazy[index].eq(pos - 1));
										}
									}
									
									$slides
										.attr('aria-hidden', true)
										.eq(pos)
										.attr('aria-hidden', false);
									
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
						
						$feature
							.attr('style', widthOverride)
							.find('li')
							.attr('style', widthOverride);
						
						Modernizr.load({
							load: ['/js/jquery.cycle.all.min.js', '/js/jquery.easing.1.3.min.js'],
							complete: function() {
								$feature
									.cycle(cycleOpts)
									.css('visibility', 'visible')
									.closest('.carousel')
									.addClass('jqcycle');
								
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
		}
	},
	
	lazyLoad: function(el, index, globalPos, slidesCount) {
		var $this = $(el),
			src = $this.data('src'),
			$swap = $this.next('.rwd-swap');
		
		if (src && !$this.data('loaded')) {
			var img = new Image();
			
			img.onload = function() {
				if ($this.data('bg-src') === false)
					$this[0].src = src;
				else
					$this[0].style.backgroundImage = 'url(' + src + ')';
				
				$this.data('loaded', true);
				
				if (slidesCount) {
					if (globalPos === 0) {
						slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos + 1));
						slider.lazyLoad(slider.$imagesLazy[index].eq(slidesCount - 1));
					}
					else if (globalPos === slidesCount - 1) {
						slider.lazyLoad(slider.$imagesLazy[index].eq(0));
						slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos - 1));
					}
					else {
						slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos + 1));
						slider.lazyLoad(slider.$imagesLazy[index].eq(globalPos - 1));
					}
				}
				
				if ($swap.length === 1)
					$swap[0].src = src;
			};
			
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
				tabCookie = cookie.read(tabID);
			
			if (tabCookie) {
				$links.eq(tabCookie).addClass('current');
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(tabCookie).show().attr('aria-hidden', false);
			}
			else {
				$links.eq(0).addClass('current');
				$panes.not(':first').attr('aria-hidden', true);
			}
			
			$links.on('click', function(e) {
				e.preventDefault();
				
				var $this = $(this),
					idx = $this.parent().index();
				
				if (!$this.hasClass('current')) {
					$links.removeClass('current');
					$this.addClass('current');
				}
				
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(idx).show().attr('aria-hidden', false);
				
				cookie.set(tabID, idx);
				trackEvent('Website', 'Tabs', tabID + '-' + idx);
			});
		});
	}
};

var accordion = {
	init: function() {
		var $accordion = $('.accordion');
		
		if ($accordion.length > 0) {
			Modernizr.load({
				load: '/js/jquery.transit.min.js',
				complete: function() {
					$accordion.each(function(index) {
						var $this = $(this),
							multiple = $this.data('multiple'),
							$accordionLinks = $this.find('.accordion_toggler'),
							$accordionContent = $this.find('.accordion_content'),
							accordionID = 'accordionid-' + window.location.pathname + '-' + index,
							accordionCookie = cookie.read(accordionID);
						
						$accordionContent.each(function(idx) {
							if (window.getComputedStyle) {
								var $this = $(this),
									transitionDuration = window.getComputedStyle(this).getPropertyValue('transition-duration') || window.getComputedStyle(this).getPropertyValue('-webkit-transition-duration'),
									transitionTimingFunction = window.getComputedStyle(this).getPropertyValue('transition-timing-function') || window.getComputedStyle(this).getPropertyValue('-webkit-transition-timing-function');
								
								if (transitionDuration.match(/\d+s$/g))
									transitionDuration = parseFloat(transitionDuration) * 1000;
								else
									transitionDuration = parseInt(transitionDuration);
								
								$this.attr('aria-hidden', true).data('transition-duration', transitionDuration).data('transition-timing-function', transitionTimingFunction);
							}
						});
						
						$accordionLinks.each(function(idx) {
							var $this = $(this),
								$accordionContentIndex = $accordionContent.eq(idx);
							
							if (accordionCookie || !multiple) {
								if (parseInt(accordionCookie) === idx) {
									$accordionLinks.removeClass('open');
									$this.addClass('open is_open');
									$accordionContentIndex.attr('aria-hidden', false);
									$accordionContentIndex.css('height', $accordionContentIndex.height());
								}
							}
							else {
								if ($this.hasClass('open')) {
									$this.addClass('is_open');
									$accordionContentIndex.attr('aria-hidden', false);
									$accordionContentIndex.css('height', $accordionContentIndex.height());
									
									if (!multiple)
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
									$accordionLinks.removeClass('open');
									$accordionContent.each(function(index) {
										if (index === idx)
											$(this).attr('aria-hidden', false).removeClass('is_open').transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
										else
											$(this).attr('aria-hidden', true).addClass('is_open').transition({height: 0}, transitionDuration, transitionTimingFunction);
									});
								}
								else {
									$this.removeClass('open').toggleClass('is_open');
									
									if ($accordionContentSibling.attr('aria-hidden') == 'false') {
										ariaHidden = true;
										transitionPropertyValue = 0;
									}
									
									$accordionContentSibling.attr('aria-hidden', ariaHidden).transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
								}
								
								if (!multiple) {
									cookie.set(accordionID, idx);
									trackEvent('Website', 'Accordions', accordionID + '-' + idx);
								}
							});
						});
					});
					
					if (window.getComputedStyle) {
						var style = document.createElement('style');
						style.appendChild(document.createTextNode('.jquery .accordion_content { -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'));
						document.head.appendChild(style);
					}
				}
			});
		}
	}
};

var tables = {
	init: function() {
		if (layoutEngine.vendor === 'ie' && layoutEngine.version === 9)
			this.gridFix();
	},
	
	gridFix: function() {
		$('table').each(function() {
			$(this).append('<tr class="ie9_grid_dummy"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		});
	}
};

})(window, document);