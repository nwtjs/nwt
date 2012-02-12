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
				nwt.one('#lateajax').setContent(o);
				unit.equal(o, nwt.one('#lateajax').getContent())
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
				unit.equal(o.obj.header, 'get')
			})
		.get();

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'post')
		})
	.post('asdf=bbq');

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'put')
		})
	.put();

	nwt.io('/testheader')
	.success(
		function(o) {
			unit.equal(o.obj.header, 'delete')
			unit.report()
		})
	.delete();
});