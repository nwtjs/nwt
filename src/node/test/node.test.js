nwt.unit
.describe('Tests Node.one against document.getElementById.')
.setup('<span id="parent"><a href="#" id="id1" class="myclass"><span id="inner">Hello</span></a></span>')
.equal(
	function () {
		return nwt.one('#id1')._node;
	},
	function () {
		return document.getElementById('id1');
	},
	function () {
		return nwt.one('#id1').parent().one('#id1')._node;
	}
);

nwt.unit
.describe('Tests Node.one against Node.all().item().')
.equal(
	function() {
		return nwt.all('#id1').item(0)._node;
	},
	function() {
		return document.getElementById('id1');
	}
);

nwt.unit
.describe('Tests Node.parent against native methods.')
.equal(
	function() {
		return nwt.one('#id1').parent()._node;
	},
	function() {
		return nwt.one('#parent')._node;
	}
);

nwt.unit
.describe('Tests Node.parent.')
.equal(
	function() {
		return nwt.one('#id1').parent()._node;
	},
	function() {
		return nwt.one('#parent')._node;
	}
);


nwt.unit
.describe('Tests Node.ancestor.')
.equal(
	function() {
		var ancestor = nwt.one('#inner').ancestor('#parent');
		return ancestor.getContent();
	},
	function() {
		return nwt.one('#parent').getContent();
	}
);

nwt.unit
.describe('Tests Node.hasClass/addClass.')
.true(
	function() {
		return nwt.one('#id1').hasClass('myclass');
	},
	function() {
		nwt.one('#id1').addClass('anotherclass');
		return nwt.one('#id1').hasClass('anotherclass');
	}
);

nwt.unit
.describe('Tests Node.removeClass.')
.false(
	function() {
		nwt.one('#id1').removeClass('anotherclass');
		return nwt.one('#id1').hasClass('anotherclass');
	}
);
