nwt.unit
.describe('Tests NWTEvent.on with a node. (Click)')
.setup('<div id="event"><a href="#">Click me!</a></div>').run(function(unit) {
	nwt.one('#event a').on('click', function (e) {
		nwt.unit.equal('Click me!', this.getContent()).report();
	});
	nwt.one('#event a').click();
});


nwt.unit
.describe('Tests NWTEvent.on/once with a node. Making sure we remove the event')
.setup('<div id="event"><a href="#">Click me!</a></div>').run(function(unit) {

	var numEventsOn = 0,
		numEventsOnce = 0;

	nwt.one('#event a').on('click', function (e) {
		numEventsOn++;
	});
	nwt.one('#event a').once('click', function (e) {
		numEventsOnce++;
	});

	nwt.one('#event a').click();
	nwt.one('#event a').click();
	nwt.one('#event a').click();
	nwt.unit.equal(3, numEventsOn);
	nwt.unit.equal(1, numEventsOnce).report();
});

nwt.unit
.describe('Tests NWTEventIntance.noBubble')
.setup('<div id="event"><a href="#">Click me!</a></div>').run(function(unit) {

	var hitParent = false;

	// Tests noBubble
	nwt.one('#event').on('click', function (e) {
		hitParent = true;
	});
	
	nwt.one('#event a').on('click', function (e) {
		e.noBubble();
	});

	nwt.one('#event a').click();
	nwt.unit.isFalse(function() { return hitParent; }).report();
});


nwt.unit
.describe('Tests NWTEventIntance.noDefault')
.setup('<div id="eventnext"><input type="checkbox"></div>').run(function(unit) {

	var el = nwt.one('#eventnext input'),

		handleClick = function (e) {
			e.noDefault();
		};
		
	el.once('click', handleClick);
	el.click();
	nwt.unit.isFalse(function() { return el.get('checked'); });

	// The second click should work because we used on
	el.click();
	nwt.unit.isTrue(function() { return el.get('checked'); }).report();
});

