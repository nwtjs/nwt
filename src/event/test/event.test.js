nwt.unit
.describe('Tests NWTEvent.on with a node. (Click)')
.setup('<div id="event"><a href="#">Click me!</a></div>').run(function(unit) {
	nwt.one('#event a').on('click', function (e) {
		nwt.unit.equal('Click me!', this.getContent()).report();
	});
	nwt.one('#event a').click();
});
