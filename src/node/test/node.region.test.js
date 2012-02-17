/**
 * This file contains test methods specifically for node.region() and node.intersects()
 */
nwt.unit
.describe('Tests Node.region.height')
.setup([
  '<div id="id1" style="position:absolute; top:10px;left:200px;height:100px; width:90px;background:#FF0000;"></div>',
  '<div id="id2" style="position:absolute; top:80px;left:280px;height:100px; width:90px;background:#FF0000;"></div>',// Intersects 1, but not 3
  '<div id="id3" style="position:absolute; top:500px;left:500px;height:100px; width:90px;background:#FF0000;"></div>',
].join(''))
.equal(
	function() {
		var region = nwt.one('#id1').region();
		return region.height;
	},
	function() {
		var region = nwt.one('#id3').region();
		return region.height;
	},
	function() {
		return 100;
	}
);


nwt.unit
.describe('Tests Node.region.width')
.equal(
	function() {
		var region = nwt.one('#id1').region();
		return region.width;
	},
	function() {
		var region = nwt.one('#id3').region();
		return region.width;
	},
	function() {
		return 90;
	}
);

nwt.unit
.describe('Tests Node.region.left')
.equal(
	function() {
		var region = nwt.one('#id1').region();
		return region.left;
	},
	function() {
		var region = nwt.one('#id3').region();
		return region.left-300;
	},
	function() {
		return 200;
	}
);

nwt.unit
.describe('Tests Node.region.right')
.equal(
	function() {
		var region = nwt.one('#id1').region();
		return region.right;
	},
	function() {
		var region = nwt.one('#id3').region();
		return region.right-300;
	},
	function() {
		return 290;
	}
);

nwt.unit
.describe('Tests Node.intersects truthy')
.isTrue(
	function() {
		var node1 = nwt.one('#id1');
		var node2 = nwt.one('#id2');
		return node1.intersects(node2);
	},
	function() {
		var node1 = nwt.one('#id1');
		var node2 = nwt.one('#id2');
		return node2.intersects(node1);
	}
);

nwt.unit
.describe('Tests Node.intersects falsey')
.isFalse(
	function() {
		var node1 = nwt.one('#id1');
		var node3 = nwt.one('#id3');
		return node1.intersects(node3);
	},
	function() {
		var node1 = nwt.one('#id1');
		var node3 = nwt.one('#id3');
		return node3.intersects(node1);
	},
	function() {
		var node2 = nwt.one('#id2');
		var node3 = nwt.one('#id3');
		return node3.intersects(node2);
	}
);
