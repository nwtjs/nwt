nwt.unit
.describe('Tests nwt.io() Wrapped response obj.')
.setup('<div id="ajax"></div>').run(function(unit) {
	nwt.io('/simplejson')
		.success(
			function(o) {
				unit.equal(o.obj.result, 1)
				unit.report()
			})
		.failure(function() {alert('failure')}).post();
});

nwt.unit
.describe('Tests nwt.io() Wrapped response obj.')
.setup('<div id="ajax"></div>').run(function(unit) {
	nwt.io('/simplejson')
		.success(
			function(o) {
				nwt.one('body').append(nwt.node.create('<div id="lateajax"></div>'));
				nwt.one('#lateajax').setHtml(o);
				unit.equal(o, nwt.one('#lateajax').getHtml())
				nwt.one('#lateajax').remove();
				unit.report()
			})
		.failure(function() {alert('failure')}).post();
});

nwt.unit
.describe('Tests nwt.io() AJAX POST.')
.setup('<div id="ajax"></div>').run(function(unit) {
	nwt.io('/simplejson')
		.success(
			function(o) {
				unit.equal(o, '{"result": 1}')
				unit.report()
			})
		.failure(function() {alert('failure')}).post();
});

nwt.unit
.describe('Tests nwt.io() AJAX methods.')
.setup('<div id="ajax"></div>').run(function(unit) {
	nwt.io('/testheader')
		.success(
			function(o) {
				unit.equal(o.obj.header, 'get');
				unit.report();
			})
		.get();

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'post');
			unit.report();
		})
	.post('asdf=bbq');

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'put');
			unit.report();
		})
	.put();

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'delete');
			unit.report();
		})
	['delete']();
});

nwt.unit
.describe('Tests nwt.io() element serialization.')
.setup('<form id="ajax" method="POST" enctype="multipart/form-data" action="#"><input type="text" name="cat" value="cheeseburger"><input type="text" name="dog" value="asdf"></form>').run(function(unit) {

	nwt.io('/checkcat')
	.success(
		function(o) {
			unit.equal(o.obj.name, 'bbq')
			unit.report();
		})
	.post('cat=bbq');

	nwt.io('/checkcat')
	.success(
		function(o) {
			unit.equal(o.obj.name, 'cheeseburger')
			unit.report();
		})
	.post(nwt.one('#ajax'));

});