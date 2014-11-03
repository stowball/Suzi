module.exports = (function() {

	function item(title, path, children) {
		return {
			title: title,
			path: path || '#',
			children: children || [],
			current: false
		};
	}

	var hierarchy = [
			item('Home', 'base.html', [
				item('Sub Nav Item 1'),
				item('Sub Nav Item 2'),
				item('Sub Nav Item 3', 'base.html'),
				item('Sub Nav Item 4'),
				item('Sub Nav Item 5'),
				item('Sub Nav Item 6'),
			]),
			item('Nav Item 2'),
			item('Nav Item 3'),
			item('Nav Item 4'),
			item('Nav Item 5'),
			item('Nav Item 6'),
	];

	return hierarchy;

})();
