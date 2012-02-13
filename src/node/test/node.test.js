nwt.unit
.describe('Tests Node.one against document.getElementById.')
.setup('<span id="parent"><a href="#" id="id1" data-key="asdf" class="myclass"><span id="inner">Hello</span></a></span>')
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
.isTrue(
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
.isFalse(
	function() {
		nwt.one('#id1').removeClass('anotherclass');
		return nwt.one('#id1').hasClass('anotherclass');
	}
);

nwt.unit
.describe('Tests Node.swapClass.')
.isTrue(
	function() {
		nwt.one('#id1').addClass('bbq');
		return nwt.one('#id1').swapClass('bbq', 'sauce').hasClass('sauce');
	},
	function() {
		return !nwt.one('#id1').swapClass('bbq', 'sauce').hasClass('bbq');
	}
);

nwt.unit
.describe('Tests Node.data.')
.equal(
	function() {
		return nwt.one('#id1').data('key');
	},
	function() {
		return nwt.one('#id1').getAttribute('data-key');
	}
);

nwt.unit
.describe('Tests Node.getAttribute/setAttribute.')
.equal(
	function() {
		return nwt.one('#id1').setAttribute('rel', 'asdf').getAttribute('rel');
	},
	function() {
		return document.getElementById('id1').getAttribute('rel');
	}
);

nwt.unit
.describe('Tests Node.getContent.')
.setup('<span id="id1">asdf</span>')
.equal(
	function() {
		return nwt.one('#id1').getContent();
	},
	function() {
		return 'asdf';
	}
);

nwt.unit
.describe('Tests Node.setContent.')
.equal(
	function() {
		nwt.one('#id1').setContent('bbq');
		return nwt.one('#id1').getContent();
	},
	function() {
		return 'bbq';
	}
);

nwt.unit
.describe('Tests Node.getStyle.')
.setup('<span id="id1" style="float:left; position:absolute;"></span>')
.equal(
	function() {
		return nwt.one('#id1').getStyle('float');
	},
	function() {
		return 'left';
	}
);

nwt.unit
.describe('Tests Node.getStyle/setStyle.')
.setup('<span id="id1" style="float:left; position:absolute;"></span>')
.equal(
	function() {
		nwt.one('#id1').setStyle('float', 'right');
		return nwt.one('#id1').getStyle('float');
	},
	function() {
		return 'right';
	}
);

nwt.unit
.describe('Tests Node.getStyle/setStyle.')
.setup('<span id="id1"><span style="position: absolute; left: 0px; top: 0px;"></span></span>')
.equal(
	function() {
		nwt.one('#id1 span').setStyles({left:100, top:100});
		return nwt.one('#id1 span').getStyle('left');
	},
	function() {
		return nwt.one('#id1 span').getStyle('top');
	},
	function() {
		return '100px';
	}
);

nwt.unit
.describe('Tests Node.serialize.')
.setup('<form id="theform"><input type="text" name="Some[name]" value="1"><input type="text" name="SomeOther" value="hello"></form>')
.equal(
	function() {
		return nwt.one('#theform').serialize();
	},
	function() {
		return 'Some[name]=1&SomeOther=hello';
	}
);

nwt.unit
.describe('Tests Node.next/previous.')
.setup('<em id="first">asdf</em><em id="second">asdf</em><em id="third">asdf</em>')
.equal(
	function() {
		return nwt.one('#first').next()._node;
	},
	function() {
		return nwt.one('#third').previous()._node;
	},
	function() {
		return document.getElementById('second');
	}
);

nwt.unit
.describe('Tests Node.append.')
.setup('<div id="id1"></div>')
.equal(
	function() {
		var newEl = nwt.node.create('<div id="woohoo">bbq</div>');
		nwt.one('#id1').append(newEl);
		return newEl._node;
	},
	function() {
		return document.getElementById('woohoo');
	}
);

nwt.unit
.describe('Tests Node.remove.')
.setup('<div id="id1"></div>')
.equal(
	function() {
		nwt.one('#id1').remove();
		return null;
	},
	function() {
		return document.getElementById('id1');
	}
);

nwt.unit
.describe('Tests Node.insert (before).')
.setup('<div id="id1"><span></span></div>')
.equal(
	function() {
		var newNode = nwt.node.create('<em>a</em>');
		nwt.one('#id1 span').insert(newNode);
		return nwt.one('#id1').getContent();
	},
	function() {
		return '<em>a</em><span></span>';
	}
);


nwt.unit
.describe('Tests Node.insert (after).')
.setup('<div id="id1"><span>b</span></div>')
.equal(
	function() {
		var newNode = nwt.node.create('<em>a</em>');
		nwt.one('#id1 span').insert(newNode, 'after');
		return nwt.one('#id1').getContent();
	},
	function() {
		return '<span>b</span><em>a</em>';
	}
);

nwt.unit
.describe('Tests Node.create.')
.setup('<div id="id1"></div>')
.equal(
	function() {
		var newNode = nwt.node.create('<div id="wtf" class="bbq" data-omg="wee">aaa</div>');
		nwt.one('#id1').append(newNode);
		return nwt.one('#id1').getContent();
	},
	function() {
		return '<div id="wtf" class="bbq" data-omg="wee">aaa</div>';
	}
);

nwt.unit
.describe('Tests Node.removeStyle.')
.setup('<div id="id1"><div style="top:0px;left:0px;"></div></div>')
.equal(
	function() {
		nwt.one('#id1 div').removeStyle('top');
		return nwt.one('#id1').getStyle('top');
	},
	function() {
		return '';
	}
);


nwt.unit
.describe('Tests Node.removeStyles.')
.setup('<div id="id1"><div style="top:0px;left:0px;"></div></div>')
.equal(
	function() {
		nwt.one('#id1 div').removeStyles(['top', 'left']);
		return nwt.one('#id1').getContent();
	},
	function() {
		return '<div style=""></div>';
	}
);