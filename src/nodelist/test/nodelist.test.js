nwt.unit
.describe('Tests nwt.all().size against native methods.')
.setup('<ul id="testlist"><li class="set1">First</li><li class="set1">Second</li><li>Third</li></ul>')
.equal(
	function () {
		return nwt.all('ul#testlist li').size();
	},
	function () {
		return document.getElementById('testlist').getElementsByTagName('li').length;
	},
	function () {
		return 3;
	}
);

nwt.unit
.describe('Tests NodeList.item().')
.equal(
	function () {
		return nwt.all('ul li').item(1).getContent();
	},
	function () {
		return 'Second';
	}
);

nwt.unit
.describe('Tests NodeList.each().')
.equal(
	function () {
		var counter = 1;
		nwt.all('ul li').each(function(el){
			if( counter > 2 ) { return; }
			el.setContent(el.getContent() + counter);
			counter++
		});
		return nwt.one('ul').getContent();
	},
	function () {
		return '<li class="set1">First1</li><li class="set1">Second2</li><li>Third</li>';
	}
);

nwt.unit
.describe('Tests NodeList iterated functions (removeClass).')
.equal(
	function () {
		nwt.all('.set1').removeClass('set1');
		return nwt.all('.set1').size();
	},
	function () {
		return 0;
	}
);

nwt.unit
.describe('Tests NodeList iterated functions (setStyle).')
.equal(
	function () {
		nwt.all('#testlist li').setStyle('font-weight', 'bold');
		return nwt.all('#testlist li').item(1).getStyle('font-weight');
	},
	function () {
		return 'bold';
	}
);

nwt.unit
.describe('Tests NodeList iterated functions (removeStyle).')
.equal(
	function () {
		nwt.all('#testlist li').removeStyle('color');
		return nwt.all('#testlist li').item(1).getStyle('color');
	},
	function () {
		return null;
	}
);
