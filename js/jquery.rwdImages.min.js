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