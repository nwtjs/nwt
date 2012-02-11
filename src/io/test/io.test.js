nwt.unit
.describe('Tests nwt.io() AJAX post.')
.setup('<div id="ajax"></div>').run(function(unit) {
	nwt.io('/simplejson')
		.success(
			function(o) {
				unit.equal(o.responseText, '{result: 1}')
				unit.report()
			})
		.failure(function() {alert('failure')}).post();
});
