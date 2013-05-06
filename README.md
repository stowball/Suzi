# Suzi

## A responsive, Sass UI Framework by [Izilla](http://izilla.com.au) - v1.0.0 (2013-05-06)

Suzi is the starting point for all of our web projects and a culmination of 6+ years' experience in maintaining a front-end framework.

While some of its markup patterns and styles are directly related to our CMS, [Cognition](http://www.cognitionecm.com), we hope Suzi is flexible enough for others to use, learn and cherry pick from.

### Features

* Built in a mobile-first, responsive philosophy
* Mixins for lots of CSS3 features including gradients with SVG & CSS3PIE support, rems with fallbacks and CSS triangles
* Starter content styles, including clean typography, lists, tables, etc
* Starter form element styles: stacked on small-screen to 2-column at the breakpoint of your choice
* Simple form validation
* Responsive, touch-friendly carousels with optional navigation, pagination & analytics tracking
* Tabs instead of spaces :)

---

### Installation

1. Install [Ruby](http://www.ruby-lang.org)
2. Install [Sass](http://sass-lang.com)
3. Download or clone Suzi
4. Run /sassqwatch.bat

---

### Usage

* Set up variables for colors, fonts, sizes, breakpoints, etc in /css/site/partials/_config.scss
* Add @font-face declarations to /css/site/partials/_fonts.scss
* Make simple customisations to links, headings, lists & tables in /css/site/partials/_simple.scss
* Make simple customisations to form elements in /css/site/partials/_forms.scss
* Modify the carousels in /css/site/partials/_slider.scss
* Add site specific styles to /css/site/partials/_site.scss
* Add any LT IE9 overrides to /css/site/partials/_ltie9.scss
* Add any print overrides to /css/site/partials/_print.scss

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

#### Functional mixins

* `rem($property, $values, $use-px-fallback: $rem-with-px-fallback)`

	Converts a pixel value to rems, while also outputting the pixel fallback (optional)
	
	* `$property`: valid CSS property
	* `$values`: valid CSS value in pixels
	* `$use-px-fallback`: whether to output a pixel fallback as well (default: $rem-with-px-fallback [true])

* `gradient($direction: 'to bottom', $nodes: (#f6f8f9, 0%, #e5ebee, 50%, #d7dee3, 50%, #f2f5f7, 100%))`

	Outputs the complete CSS3 gradient syntax for Chrome, Safari, Firefox, Opera, IE10, other capable browsers and SVG for IE9

	* `$direction` takes either the legacy syntax or the unprefixed W3C syntax, including angles. The following angles are supported for SVGs: 0, 10, 45, 90, 135, 170, 180, 190, 225, 270, 315, 350
	* `$nodes` takes a list of comma separated #color, position% pairs
	* Uses the background property (and background-image for IE9) unless the global `$use-background-property` is `false`  
	* Outputs a fallback background of the last color in the list unless the global `$use-background-fallback` is `false`
	* Outputs CSS3PIE syntax for LT IE9 unless the global `$use-pie-background` is `false`

* `triangle($direction: right, $width: 5px, $height: 10px, $color: $std-link-color, $layout: true, $border-style: true, $webkit-rotate: true)`

	Outputs a CSS triangle for use in :before/:after pseudo-elements. It duplicates the rule, using rgba for transparency to prevent 'black fringes'

	* `direction`: up, down, left, right (default: right)
	* `$width`: width in pixels (default: 5px)
	* `$height`: height in pixels (default: 10px)
	* `$color`: triangle's hex color (default: $std-link-color)
	* `$layout`: whether to output CSS `content`, `display`, `height` & `width` properties (default: true)
	* `$border-style`: whether to output the CSS `border-style` property (default: true)
	* `$webkit-rotate`: whether to rotate the triangle by 360deg in WebKit for smoother appearance (default: true)

#### Class mixins

* `clearfix`

	Float clearing without hacks for IE7+ and every other browser

* `hidden`

	Accessibly hide an element off-screen

* `hide-text($display: false, $width: false)`

	Hide an element's text content

	* `$display`: sets the `display` property to a value of your choice (default: false)
	* `$width`: sets the width of the element (default: false)
	
#### CSS Property mixins

* `border-radius($radius: 5px)`

	Outputs -webkit and unprefixed `border-radius` with the value passed in (default: 5px)

* `box-shadow($shadow: 0 1px 3px rgba(0,0,0,.25))`

	Outputs, -moz, -webkit and unprefixed `box-shadow` with the value passed in (default: 0 1px 3px rgba(0,0,0,.25))

* `box-sizing($boxsize: border-box)`

	Outputs -moz, -webkit and unprefixed `box-sizing` with the value passed in (defauly: border-box)

* `pie($path: '/css/PIE.htc')`

	Outputs CSS3PIE `behavior` property with path to PIE.htc and `position: relative` (default $path: '/css/PIE.htc')

* `rgba-background($color, $opacity: 0.5, $use-fallback: true, $use-background-color: false)`

	Converts a background color and opacity to `rgba`, with the option to output the fallback color
	
	* `$color`: color to be converted
	* `$opacity`: alpha opacity of the color (default: 0.5)
	* `$use-fallback`: whether to output the fallback color (default: true)
	* `$use-background-color`: whether to use `background-color` property instead of `background` (default: false)

* `transition($property: all, $timing: ease, $duration: 0.5s)`

	Outputs, -moz, -o, -webkit and unprefixed `transition` with the values passed in

	* `$property`: which property to transition (default: all)
	* `$timing`: which timing function to use (default: ease)
	* `$duration`: duration of the transition (default: 0.5s)

#### Media Query mixins

* `media-query($value, $operator: $min, $px: false)`

	Outputs a standard media query using ems
	
	* `$value`: pixel value for the breakpoint
	* `$operator`: operator for the breakpoint, e.g. min-width, max-width, min-height, max-height (default: $min [min-width])
	* `$px`: use px instead of ems

* `media-query-and($first-value, $second-value, $first-operator: $min, $second-operator: $max, $px: false)`

	Outputs an media query with an 'and' condition
	
	* `$first-value`: pixel value for the first breakpoint
	* `$second-value`: pixel value for the second breakpoint
	* `$first-operator`: operator for the first breakpoint, e.g. min-width, max-width, min-height, max-height (default: $min [min-width])
	* `$second-operator`: operator for the second breakpoint
	* `$px`: use px instead of ems

* `media-query-retina`

	Outputs a media query for Hi-DPI devices

---

A Dreamweaver extension is available which adds code hint support for all of the above mixins and functions.