var cssua=function(k,n){var p=/\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,q=/([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,r=/\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,s=/\bsilk-accelerated=true\b/,t=/\bfluidapp\b/,u=/(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,v=/(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,
w=/(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,d={parse:function(c){var a={};c=(""+c).toLowerCase();if(!c)return a;for(var b,g,e=c.split(/[()]/),f=0,d=e.length;f<d;f++)if(f%2){var l=e[f].split(";");b=0;for(g=l.length;b<g;b++)if(p.exec(l[b])){var h=RegExp.$1.split(" ").join("_"),k=RegExp.$2;if(!a[h]||parseFloat(a[h])<parseFloat(k))a[h]=k}}else if(l=e[f].match(q))for(b=0,g=l.length;b<g;b++)h=l[b].split(/[\/\s]+/),h.length&&"mozilla"!==h[0]&&(a[h[0].split(" ").join("_")]=h.slice(1).join("-"));v.exec(c)?
(a.mobile=RegExp.$1,r.exec(c)&&(delete a[a.mobile],a.blackberry=a.version||RegExp.$3||RegExp.$2||RegExp.$1,RegExp.$1?a.mobile="blackberry":"0.0.1"===a.version&&(a.blackberry="7.1.0.0"))):u.exec(c)?a.desktop=RegExp.$1:w.exec(c)&&(a.game=RegExp.$1,b=a.game.split(" ").join("_"),a.version&&!a[b]&&(a[b]=a.version));a.intel_mac_os_x?(a.mac_os_x=a.intel_mac_os_x.split("_").join("."),delete a.intel_mac_os_x):a.cpu_iphone_os?(a.ios=a.cpu_iphone_os.split("_").join("."),delete a.cpu_iphone_os):a.cpu_os?(a.ios=
a.cpu_os.split("_").join("."),delete a.cpu_os):"iphone"!==a.mobile||a.ios||(a.ios="1");a.opera&&a.version?(a.opera=a.version,delete a.blackberry):s.exec(c)?a.silk_accelerated=!0:t.exec(c)&&(a.fluidapp=a.version);if(a.applewebkit)a.webkit=a.applewebkit,delete a.applewebkit,a.opr&&(a.opera=a.opr,delete a.opr,delete a.chrome),a.safari&&(a.chrome||a.crios||a.opera||a.silk||a.fluidapp||a.phantomjs||a.mobile&&!a.ios?delete a.safari:a.safari=a.version&&!a.rim_tablet_os?a.version:{419:"2.0.4",417:"2.0.3",
416:"2.0.2",412:"2.0",312:"1.3",125:"1.2",85:"1.0"}[parseInt(a.safari,10)]||a.safari);else if(a.msie||a.trident)if(a.opera||(a.ie=a.msie||a.rv),delete a.msie,a.windows_phone_os)a.windows_phone=a.windows_phone_os,delete a.windows_phone_os;else{if("wpdesktop"===a.mobile||"xblwp7"===a.mobile||"zunewp7"===a.mobile)a.mobile="windows desktop",a.windows_phone=9>+a.ie?"7.0":10>+a.ie?"7.5":"8.0",delete a.windows_nt}else if(a.gecko||a.firefox)a.gecko=a.rv;a.rv&&delete a.rv;a.version&&delete a.version;return a},
format:function(c){var a="",b;for(b in c)if(b&&c.hasOwnProperty(b)){var g=b,e=c[b],g=g.split(".").join("-"),f=" ua-"+g;if("string"===typeof e){for(var e=e.split(" ").join("_").split(".").join("-"),d=e.indexOf("-");0<d;)f+=" ua-"+g+"-"+e.substring(0,d),d=e.indexOf("-",d+1);f+=" ua-"+g+"-"+e}a+=f}return a},encode:function(c){var a="",b;for(b in c)b&&c.hasOwnProperty(b)&&(a&&(a+="\x26"),a+=encodeURIComponent(b)+"\x3d"+encodeURIComponent(c[b]));return a}};d.userAgent=d.ua=d.parse(n);var m=d.format(d.ua)+
" js";k.className=k.className?k.className.replace(/\bno-js\b/g,"")+m:m.substr(1);return d}(document.documentElement,navigator.userAgent);
/* Modernizr 2.6.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-csstransforms-csstransforms3d-input-inputtypes-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(n.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),F(e,b,c))}function H(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in k;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.csstransforms=function(){return!!G("transform")},r.csstransforms3d=function(){var a=!!G("perspective");return a&&"webkitPerspective"in g.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.fontface=function(){var a;return x('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a};for(var I in r)z(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.input||H(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*
* Supports Touch v0.1.0
*
* Detects touch support and adds appropriate classes to html and returns a JS object
*
* Copyright (c) 2013 Izilla Partners Pty Ltd
*
* http://www.izilla.com.au
*
* Licensed under the MIT license
*/
;var supports=(function(){var a=document.documentElement,b="ontouchstart" in window||navigator.msMaxTouchPoints;if(b){a.className+=" touch";return{touch:true}}else{a.className+=" no-touch";return{touch:false}}})();
/*
 * Izilla GUP v1.1.2
 * Gets "true" url parameters and adds them as classes to html the tag and to the izilla_gup object
 *
 * eg. article.html?lightbox=true&mqdebug=true
 *
 * Usage CSS: html.param {}
 * Usage JS : izilla_gup.param
 *
 * Copyright (c) 2012 Izilla Partners Pty Ltd
 *
 * http://www.izilla.com.au
 *
 * Licensed under the MIT license
 *
 */
;var izilla_gup=(function(){var d=/(&|\?)(\w+)=true/gi,e=window.location.href,a,b="",c={};while(a=d.exec(e)){b+=" "+a[2];c[a[2]]=true}document.documentElement.className+=b;return c})();
/*!
* Layout Engine v0.8.0
*
* Adds the rendering engine and browser names as a class on the html tag and returns a JavaScript object containing the vendor, version and browser name (where appropriate)
*
* Possible vendors: '.vendor-' + 'ie', 'khtml', 'mozilla', 'opera', 'webkit'
* '.vendor-ie' also adds the version: 'vendor-' + 'ie-11', 'ie-10', 'ie-9', 'ie-8', 'ie-7'
* '.vendor-opera-mini' is also detected
*
* Possible browsers: '.browser-' + 'android', 'chrome', 'wiiu'
*
* Copyright (c) 2013 Matt Stow
*
* http://mattstow.com
*
* Licensed under the MIT license
*/
;var layoutEngine=(function(){var j=document.documentElement,c=j.style,l=" vendor-",b="ie",f="khtml",m="mozilla",g="opera",k="webkit",i=" browser-",e="android",h="chrome",d="wiiu",n=l;if("WebkitAppearance" in c){n+=k;var a=navigator.userAgent;if(a.indexOf("Android")>=0&&a.indexOf("Chrome")===-1){j.className+=n+i+e;return{vendor:k,browser:e}}else{if(!!window.chrome||a.indexOf("OPR")>=0){j.className+=n+i+h;return{vendor:k,browser:h}}else{if(!!window.wiiu){j.className+=n+i+d;return{vendor:k,browser:d}}else{j.className+=n;return{vendor:k}}}}}else{if("MozAppearance" in c){j.className+=n+m;return{vendor:m}}else{if("-ms-scroll-limit" in c||"behavior" in c){n+=b+l+b;if("-ms-ime-align" in c){j.className+=n+"-11";return{vendor:b,version:11}}else{if("-ms-user-select" in c){j.className+=n+"-10";return{vendor:b,version:10}}else{if("fill" in c){j.className+=n+"-9";return{vendor:b,version:9}}else{if("widows" in c){j.className+=n+"-8";return{vendor:b,version:8}}else{j.className+=n+"-7";return{vendor:b,version:7}}}}}}else{if("OLink" in c||!!window.opera){n+=g;if("OMiniFold" in c){j.className+=n+g+"-mini";return{vendor:g,version:"mini"}}else{j.className+=n;return{vendor:g}}}else{if("KhtmlUserInput" in c){j.className+=n+f;return{vendor:f}}else{return false}}}}}})();
/*!
* mqGenie v0.4.1
*
* Adjusts CSS media queries in browsers that include the scrollbar's width in the viewport width so they fire at the intended size
*
* Returns the mqGenie object containing .adjusted, .width & fontSize for use in re-calculating media queries in JavaScript with mqAdjust(string)
*
* Copyright (c) 2013 Matt Stow
*
* http://mattstow.com
*
* Licensed under the MIT license
*/
;(function(e,t){function n(e,t){var n=e.cssRules?e.cssRules:e.media,r,i=[],s=0,o=n.length;for(s;s<o;s++){r=n[s];if(t(r))i.push(r)}return i}function r(e){return n(e,function(e){return e.constructor===CSSMediaRule})}function i(n){var r=e.location,i=t.createElement("a");i.href=n;return i.hostname===r.hostname&&i.protocol===r.protocol}function s(e){return e.ownerNode.constructor===HTMLStyleElement}function o(e){return e.href&&i(e.href)}function u(){var e=t.styleSheets,n,r=e.length,i=0,u=[];for(i;i<r;i++){n=e[i];if(o(n)||s(n))u.push(n)}return u}if(!t.addEventListener)return;t.addEventListener("DOMContentLoaded",function(){e.mqGenie=function(){var n=t.documentElement;n.style.overflowY="scroll";var i=e.innerWidth-n.clientWidth,s={adjusted:i>0,fontSize:parseFloat(e.getComputedStyle(n).getPropertyValue("font-size")),width:i};if(s.adjusted){if("WebkitAppearance"in n.style){var o=/Chrome\/(\d*?\.\d*?\.\d*?\.\d*?)\s/g,a=navigator.userAgent.match(o),f;if(a){a=a[0].replace(o,"$1");f=a.split(".");f[0]=parseInt(f[0]);f[2]=parseInt(f[2]);f[3]=parseInt(f[3]);if(f[0]<=29){if(f[0]===29&&f[2]<1548&&f[3]<57){s.adjusted=false}else if(f[0]<29){s.adjusted=false}}}else{s.adjusted=false}if(!s.adjusted)return s}var l=u(),c=l.length,h=0,p,d;for(h;h<c;h++){p=r(l[h]);d=p.length;for(var v=0;v<d;v++){p[v].media.mediaText=p[v].media.mediaText.replace(/m(in|ax)-width:\s*(\d|\.)+(px|em)/gi,function(e){if(e.match("px")){return e.replace(/\d+px/gi,function(e){return parseInt(e,10)+s.width+"px"})}else{return e.replace(/\d.+?em/gi,function(e){return(parseFloat(e)*s.fontSize+s.width)/s.fontSize+"em"})}})}}}return s}();e.mqAdjust=function(e){if(!mqGenie.adjusted)return e;var t=e.replace(/\d+px/gi,function(e){return parseInt(e,10)+mqGenie.width+"px"});t=t.replace(/\d.+?em/gi,function(e){return(parseFloat(e)*mqGenie.fontSize+mqGenie.width)/mqGenie.fontSize+"em"});return t}})})(window,document);