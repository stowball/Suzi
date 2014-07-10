# Suzi

## A responsive, Sass and Grunt UI Framework by [Izilla](http://izilla.com.au)

### v1.5.0 (2014-05-30)

Suzi is the starting point for all of our web projects and a culmination of 6+ years' experience in maintaining a front-end framework.

While some of its markup patterns and styles are directly related to our CMS, [Cognition](http://www.cognitionecm.com), we hope Suzi is flexible enough for others to use, learn and cherry pick from.

### Features

* Built in a mobile-first, responsive philosophy *(but can easily be used for fixed sites as well)*
* Mixins for lots of CSS3 features including gradients with SVG & CSS3PIE support, rems with pixel fallbacks, correctly-prefixed transitioned transforms and CSS triangles
* Starter content styles, including clean typography, lists, tables, etc
* Starter form element styles: stacked on small-screen to 2-column at the breakpoint of your choice
* Simple form validation
* Responsive, lazy-loaded, touch-friendly carousels with optional navigation & pagination, analytics tracking & cookie-based remembering of last visible slide
* Simple, accessible JavaScript tabs with cookie-based remembering of the open pane
* Simple, accessible JavaScript accordions which transition to and from `height: auto`, and support multiple open panes
* Simple, but powerful HTML templating using [grunt-includereplace-more](https://github.com/stowball/grunt-include-replace-more)
* Concatenation and minification of CSS and JS files with [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* Cache busting of CSS and JS assets with a unique timestamp querystring
* Optimising of images with [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
* Tabs instead of spaces :)

---

### Installation

1. Install [Ruby](http://www.ruby-lang.org) *(and add it to your Path Environment Variable on Windows)*
2. Install [Sass](http://sass-lang.com)
3. Install [node.js](http://nodejs.org) *(and add it to your Path Environment Variable on Windows)*
4. Open a shell window and install the Grunt CLI with `npm install -g grunt-cli`
5. [Download](https://github.com/izilla/Suzi/archive/master.zip) or [clone](https://github.com/izilla/Suzi.git) Suzi
6. Open a shell window in the Suzi root directory
7. Run `npm install` to install Suzi's Grunt dependencies

---

### Usage

In a shell window, run `grunt` or open gruntwatch.bat for quick access in Windows

* Set up variables for colors, fonts, sizes, breakpoints, etc in /css/site/partials/_config.scss
* Add @font-face declarations to /css/site/partials/_fonts.scss
* Make simple customisations to links, headings, lists & tables in /css/site/partials/_simple.scss
* Make simple customisations to form elements in /css/site/partials/_forms.scss
* Modify the carousels in /css/site/partials/_carousel.scss
* Create and add site specific partials to /css/site/partials/_site.scss
* Add any LT IE9 overrides to /css/site/partials/_ltie9.scss
* Add any print overrides to /css/site/partials/_print.scss

To use the Sass-only features of Suzi, run sassqwatch.bat *(on Windows)* or bash sassqwatch.sh *(on Mac)*

---

### Mixins and Functions

#### Helper functions

* `strip-units($number)`

	Strips units from the number specified

* `em($pixels, $context: 16, $unitless: false)`

	Converts a pixel value to ems, with an optional parameter to make it unitless (which is useful for line-heights)
	
	* `$pixels`: target size in pixels
	* `$context`: context size in pixels (default: 16)
	* `$unitless`: whether to omit the em unit (default: false)

* `percent($pixels, $context: $site-width)`

	Converts a pixel value to a percentage
	
	* `$pixels`: target size in pixels
	* `$context`: context size in pixels (default: $site-width)

#### Functional mixins

* `calc($property, $expression, $fallback: false)`

	Outputs the [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) CSS function and an optional fallback
	
	* `$property`: The CSS property to be used
	* `$expression`: A mathematical expression, the result of which is used as the value
	* `fallback`: A fallback value for browsers that don't support `calc()`

* `gradient($nodes: (#f6f8f9, 0%, #e5ebee, 50%, #d7dee3, 50%, #f2f5f7, 100%), $direction: 'to bottom', repeating: false)`

	Outputs the complete CSS3 gradient syntax for Chrome, Safari, Firefox, Opera, IE10, other capable browsers and SVG for IE9

	* `$nodes` takes a list of comma-separated #color, position% pairs. If only a single color is passed in, a plain `background` or `background-color` will be created depending on `$use-background-property`
	* `$direction` takes either the legacy syntax or the unprefixed W3C syntax, including angles. The following angles are supported for SVGs: 0, 10, 45, 90, 135, 170, 180, 190, 225, 270, 315, 350
	* `$repeating`: whether to create repeating linear gradients (default: false)
	* Uses the background property (and background-image for IE9) unless the global `$use-background-property` is `false`
	* Outputs a fallback background of the last color in the list unless the global `$use-background-fallback` is `false`
	* Outputs base 64 SVG syntax for IE9 unless `$repeating` is true
	* Outputs CSS3PIE syntax for LT IE9 unless the global `$use-pie-background` is `false` or `$repeating` is true

* `grid($breakpoints: (480, 600, 768, 960), $percentages: (10, 20, 25, 30, 33.3333, 40, 50, 60, 66.6666, 70, 75, 80, 90, 100), $float-classes: false)`

	Outputs relevant media queries and helper classes for [Suzi's flexible, customisable and responsive grid system](https://github.com/izilla/Suzi/blob/master/builds/markup/grid.html)
	
	* `$breakpoints`: A list of the breakpoints (in pixels) that media queries and classes should be generated for (default: 480, 600, 768, 960))
	* `$percentages`: A list of the class name percentages to be output for each breakpoint and as simple default overrides (default: 10, 20, 25, 30, 33.3333, 40, 50, 60, 66.6666, 70, 75, 80, 90, 100)
	* `$float-classes`: Whether to output classes to `float` `.grid_item`s to alter source order appearance (default: false)

* `grid-override($name, $gutter)`

	Outputs `$name_`-prefixed `.grid_container` and `.grid_item` classes to override standard grid styles.
	
	* `$name`: The prefix to use for `.grid_container` and `.grid_item` classes. For instance, `$name: small` produces `.small_grid_container` and `.small_grid_item`
	* `$gutter`: The new gutter value for the relevant `margin` and `padding` properties for these grid override classes
	* `$gutter` can also be a list to allow different horizontal and vertical gutters. The 1st parameter is horizontal, and the 2nd vertical, eg: `(30px, 10px)` for 30px horizontal and 10px vertical

* `hover($pseudo: false)`

	Outputs `:hover` & `:focus` rules for the current element
	
	* `$pseudo`: the name of a single pseudo-element (after, before) or a list of multiple to create `:hover` & `:focus` rules for
	
* `nth-child($an: 2n, $sibling: '*', $count: 15)`

	Allows nth-child functionality for .ltie9 (if you can't/don't want to use [Selectivzr](http://selectivizr.com)) by outputting crazy sibling selectors
	
	* `$an`: the counting method, eg: 2n, 3n, odd (default: 2n)
	* `$an` can also be a list, with the 2nd parameter being the modifier, eg: 2 for ($an+2) or -3 for ($an-3)
	* `$sibling`: the sibling element selector, eg: 'li', 'div' (default: '*')
	* `$count` how many sibling selectors to support, eg: 10, 20 (default: 15)

* `triangle($direction: right, $width: 5px, $height: 10px, $color: $std-link-color, $layout: true, $border-style: true, $webkit-rotate: true, $important: false)`

	Outputs a CSS triangle for use in :before/:after pseudo-elements. It duplicates the rule, using rgba for transparency to prevent 'black fringes'

	* `direction`: up, down, left, right (default: right)
	* `$width`: width in pixels (default: 5px)
	* `$height`: height in pixels (default: 10px)
	* `$color`: triangle's hex color (default: $std-link-color)
	* `$layout`: whether to output CSS `content`, `display`, `height` & `width` properties (default: true)
	* `$border-style`: whether to output the CSS `border-style` property (default: true)
	* `$webkit-rotate`: whether to rotate the triangle by 360deg in WebKit for smoother appearance (default: true)
	* `$important`: whether to also output `!important` on `border-color` and `border-width` properties (default: false)

* `placeholder($color: $form-placeholder-color, $text-transform: $form-placeholder-text-transform)`

	Outputs cross-browser placeholder styles using
	
	* `$color`: Sets the `color` of the placeholder text (default: $form-placeholder-color)
	* `$text-transform`: Sets the `text-transform` property of the placeholder text (default: $form-placeholder-text-transform)

* `rem($property, $values, $use-px-fallback: $rem-with-px-fallback)`

	Converts a pixel value to rems, while also outputting the pixel fallback (optional)
	
	* `$property`: valid CSS property
	* `$values`: valid CSS value in pixels
	* `$use-px-fallback`: whether to output a pixel fallback as well (default: $rem-with-px-fallback [true])

#### Class mixins

* `classquery($class-name, $output-ltie9-rule)`

	Generates `.classquery-$class-name` & (optional) `.ltie9 [data-classquery*=".classquery-$class-name"]` selectors to be used with class.query.js to manage responsive content
	
	* `$class-name`: the class name to use (default: default)
	* `$output-ltie9-rule`: whether to output the `.ltie9` rule. Set to false if the class is used for a max-width media query (default: true)

* `clearfix`

	Float clearing without hacks for IE7+ and every other browser

* `hidden($hide: true)`

	Accessibly hide (and un-hide) an element off-screen
	
	* `$hide`: whether to hide or unhide the (default: true)

* `hide-text($display: false, $width: false, $height: false)`

	Hide an element's text content

	* `$display`: sets the `display` property to a value of your choice (default: false)
	* `$width`: sets the width of the element (default: false)
	* `$height`: sets the heightof the element (default: false)

* `horizontal($vertical-align: top, $width: 100%)`

	Sets the `UL` specified and its immediate `LI`s to use `display: table` to create an evenly spaced, horizontal list for modern browsers and uses floats for `.ltie8`. Used in the `.horizontal` and `.horizontal_auto` classes
	
	* `$vertical-align`: the `vertical-align` value to give to the child `LI`s (default: top)
	* `$width`: the `width` value to give to the `UL` (default: 100%)

* `icomoon`

	Generates `[class^="icon-"], [class*=" icon-"]` selector for easy overriding of base [icomoon](http://icomoon.io) icon font styles

* `icon($name)`

	Generates `.icon-$name` selector for easy overriding of individual [icomoon](http://icomoon.io) icon font styles

* `no-fontface`

	Generates a `.no-fontface &, .ua-windows_phone-7 &` selector for making adjustments if `@fontface` isn't supported. Especially useful for icon fonts.

#### CSS Property mixins

* `animation($property: default 1s ease)`

	Outputs -moz, -o-, -webkit and unprefixed `animation` with the value passed in (default: default 1s ease)
	
* `animation-delay($value: 1s)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-delay` with the value passed in (default: 1s)

* `animation-direction($value: normal)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-direction` with the value passed in (default: normal)

* `animation-duration($value: 1s)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-duration` with the value passed in (default: 1s)

* `animation-fill-mode($value: none)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-fill-mode` with the value passed in (default: none)

* `animation-iteration-count($value: 1)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-iteration-count` with the value passed in (default: 1)

* `animation-name($value: default)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-name` with the value passed in (default: default)

* `animation-timing-function($value: ease)`

	Outputs -moz, -o-, -webkit and unprefixed `animation-timing-function` with the value passed in (default: ease)

* `background($color, $duplicate-as-pie: false)`

	Outputs a background rule with the $color specified. If $duplicate-as-pie is true, it will also output a -pie-background property (useful for overriding a gradient on hover, for example)

* `border-radius($radius: 5px, $background-clip: padding-box)`

	Outputs -webkit and unprefixed `border-radius`
	
	* `$radius`: radius to use (default: 5px)
	* `$background-clip`: which `background-clip` property to use (if any) (default: padding-box)

* `box-shadow($shadow: 0 1px 3px rgba(0,0,0,.25))`

	Outputs, -webkit and unprefixed `box-shadow` with the value passed in (default: 0 1px 3px rgba(0,0,0,.25))

* `box-sizing($boxsize: border-box)`

	Outputs -moz, -webkit and unprefixed `box-sizing` with the value passed in (default: border-box)

* Flexbox

	A complete set of Flexbox mixins for all syntax variations. See https://github.com/mastastealth/sass-flex-mixin for details and documentation.

* `font-size-line-height($font-size, $line-height: false, $important: false)`

	Outputs a rem (and pixel fallback) font-size and an optional unitless line-height from the values provided
	
	* `$font-size`: target `font-size` to achieve in pixels
	* `$line-height`: target `line-height` size to achieve in pixels if not `false` (default: false)
	* `$important`: whether to also output an `!important` declaration on both properties (default: false)
	
* `keyframes($name)`

	Outputs -moz, -o-, -webkit and unprefixed animation `@keyframes` named with the value passed in

* `line-height($target, $context: 16, $important: false)`

	Outputs a unitless line-height from the target and context sizes provided
	
	* `$target`: target `line-height` size to achieve in pixels
	* `$context`: the `font-size` in pixels of the current element (default: 16)
	* `$important`: whether to also output an `!important` declaration (default: false)

* `pie($position: relative, $path: false)`

	Outputs a `position` property and CSS3PIE `behavior` property with path to PIE.htc
	
	* `$position:` `position` property to use or `false` for none (default: relative)
	* `$path`: path to PIE.htc if specified, otherwise uses `$default-pie-path` variable when `false` (default: false [$default-pie-path: '/css/PIE.htc'])

* `rgba($property, $value: '', $color: #000, $opacity: 0.5, $use-fallback: true)`

	Converts any property's color and opacity to `rgba`, with the option to output a default fallback color or a composite fallback color of your choice
	
	* `$property`: the CSS property to use, for example `border`
	* `$value`: an optional value prefix to use, such as `1px solid` (default '')
	* `$color`: color to be converted - either a single value or a list
	* if `$color` is a list, the second parameter is used as the fallback colour - useful for composite fallbacks
	* `$opacity`: alpha opacity of the color (default: 0.5)
	* `$use-fallback`: whether to output the fallback color (default: true)

* `rgba-background($color, $opacity: 0.5, $use-fallback: true, $use-background-color: false)`

	Converts a background color and opacity to `rgba`, with the option to output a default fallback color or a composite fallback color of your choice
	
	* `$color`: color to be converted - either a single value or a list
	* if `$color` is a list, the second parameter is used as the fallback colour - useful for composite fallbacks
	* `$opacity`: alpha opacity of the color (default: 0.5)
	* `$use-fallback`: whether to output the fallback color (default: true)
	* `$use-background-color`: whether to use `background-color` property instead of `background` (default: false)

* `transform($transform-function: none)`

	Outputs, -ms, -moz, -o, -webkit and unprefixed `transform` with the value passed in (default: none)
* `transform-origin($transform-origin: 50% 50% 0)`


	Outputs, -ms, -moz, -o, -webkit and unprefixed `transform-origin` with the value passed in (default: 50% 50% 0)

* `transition($property: all ease 0.2s)`

	Outputs, -moz, -o, -webkit and unprefixed `transition` with the value passed in (default: all ease 0.2s)
	Instances of `transform` or `transform-origin` will be prefixed as required.

* `transition-delay($delay: 0.2s)`

	Outputs, -moz, -o, -webkit and unprefixed `transition-delay` with the value passed in (default: 0.2s)

* `transition-duration($duration: 0.2s)`

	Outputs, -moz, -o, -webkit and unprefixed `transition-duration` with the value passed in (default: 0.2s)

* `transition-property($property: all)`

	Outputs, -moz, -o, -webkit and unprefixed `transition-property` with the value passed in (default: all)
	Instances of `transform` or `transform-origin` will be prefixed as required.

* `transition-timing-function($timing: ease)`

	Outputs, -moz, -o, -webkit and unprefixed `transition-timing-function` with the value passed in (default: ease)

31 transition-timing-function variables are defined in src/partials/_easing-functions.scss

* `viewport($width: device-width)`

	Outputs, -moz, -ms, -o, -webkit and unprefixed `@viewport` with the value passed in (default: device-width)

#### Media Query mixins

Four variables are provided for media query operators: `$min`, `$max`, `$min-h` & `$max-h` for `min-width`, `max-width`, `min-height` and `max-height`, respectively

* `media-query($value, $ltie9: $use-ltie9-mq-fallbacks, $operator: $min, $px: false)`

	Outputs a standard media query using ems and an optional .ltie9 fallback
	
	* `$value`: pixel value for the breakpoint
	* `$ltie9`: whether to output .ltie9 fallback (default: $use-ltie9-mq-fallbacks [true])
	* `$operator`: operator for the breakpoint, e.g. min-width, max-width, min-height, max-height (default: $min [min-width])
	* `$px`: use px instead of ems

* `media-query-and($first-value, $second-value, $first-operator: $min, $second-operator: $max, $px: false)`

	Outputs a media query with an 'and' condition and an optional .ltie9 fallback (unless max-width is less than $site-width)
	
	* `$first-value`: pixel value for the first breakpoint
	* `$second-value`: pixel value for the second breakpoint
	* `$ltie9`: whether to output .ltie9 fallback (default: $use-ltie9-mq-fallbacks [true])
	* `$first-operator`: operator for the first breakpoint, e.g. min-width, max-width, min-height, max-height (default: $min [min-width])
	* `$second-operator`: operator for the second breakpoint
	* `$px`: use px instead of ems

* `media-query-retina`

	Outputs a media query for Hi-DPI devices

---

Copyright (c) 2014 [Izilla Partners Pty Ltd](http://www.izilla.com.au)  
Licensed under the MIT license *(see [LICENSE](https://github.com/izilla/Suzi/blob/master/LICENSE) for details)*