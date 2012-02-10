nwt.unit
.describe('Tests nwt.io() AJAX post.')
.setup('<div id="ajax"></div>')
.equal(
	function () {
		nwt.io('test/simplejson.txt').success(function() {alert('success')}).failure(function() {alert('failure')}).post();
	},
	function () {
		return '{result: 1}';
	}
);