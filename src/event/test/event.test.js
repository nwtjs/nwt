nwt.unit
.describe('Tests NWTEvent.on with a node. (Click)')
.setup('<div id="event"><a href="#">Click me!</a></div>').run(function(unit) {
	nwt.one('#event a').on('click', function (e) {
		nwt.unit.equal('Click me!', this.getHtml()).report();
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
	nwt.unit.isFalse(function() { return hitParent; });


	// Tests that custom events DO BUBBLE
	var bubbleCount = 0;
	nwt.one('#event').on('omgcustom', function (e) {
		bubbleCount++;
	});
	
	nwt.one('#event a').on('omgcustom', function (e) {
		bubbleCount++;
	});

	nwt.one('#event a').fire('omgcustom');
	nwt.unit.equal(bubbleCount, 2).report();

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
	nwt.unit.isTrue(function() { return el.get('checked'); });
});

nwt.unit
.describe('Tests event delegation with on and a selector')
.setup('<div id="event"><a id="first" class="yes" href="#">a</a><a id="second" href="#">b</a><a href="#" id="third" class="yes">c</a></div>').run(function(unit) {

	var genContent = "",
	
		populateResponse = function (e) {
			genContent += e.target.getHtml()
		};
	
	nwt.one('#event').on('click', populateResponse, '.yes');

	nwt.one('#event a#first').click();
	nwt.one('#event a#second').click();
	nwt.one('#event a#third').click();

	nwt.unit.equal('ac', genContent).report();

	// Attempt to use event.once with a selector
	nwt.one('#event').off('click', populateResponse);

	nwt.one('#event').once('click', populateResponse, '.yes');

	nwt.one('#event a#first').click();
	nwt.one('#event a#second').click();
	nwt.one('#event a#third').click();

	nwt.unit.equal('aca', genContent);
});

nwt.unit
.describe('Tests custom events and custom event data')
.setup('<div id="event"></div>').run(function(unit) {

	var isFired = false,
		testData;

	nwt.one('#event').once('customEvt', function(e, arg1){
		isFired = true;
		testData = arg1.someKey;
	});

	nwt.one('#event').fire('customEvt', {someKey: 'someData'});

	nwt.unit.equal(isFired, true);
	nwt.unit.equal(testData, 'someData').report();
});