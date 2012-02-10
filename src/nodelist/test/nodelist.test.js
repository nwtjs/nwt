nwt.unit
.describe('Tests nwt.all().size against native methods.')
.setup('<ul id="testlist"><li>First</li><li>Second</li><li>Third</li></ul>')
.equal(
	function () {
		return nwt.all('ul li').size();
	},
	function () {
		return document.getElementById('testlist').getElementsByTagName('li').length;
	},
	function () {
		return 3;
	}
);