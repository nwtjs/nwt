nwt.unit
.describe('Tests nwt.anim().')
.run(function(unit) {

	// Create animation elements
	n.one('body').append(n.node.create([
		'<div id="anims">',
			'<div id="animleft" style="position:absolute;top:0;left:0;">.</div>',
			'<div id="animtop" style="position:absolute;top:0;left:0;">.</div>',
			'<div id="animwidth" style="width:100px;background:#0000FF;">.</div>',
			'<div id="animheight" style="height:100px;background:#FF0000;">.</div>',
		'</div>'
	].join('')))

	var animTests = {
		animleft: ['left', 0, 100],
		animtop: ['top', 0, 100],
		animwidth: ['width', 100, 200],
		animheight: ['height', 100, 200]
	}

	// Tests a node animation value after animation has ended
	, getCompleteTester = function(test, el, idx) {
		return function() {
			unit.equal(test[idx], parseInt(el.getStyle(test[0]), 10))
		}
	},

	// Tests an animation during the transition
	// The test value should be between the two ends
	getTransitionTester = function(test, el) {
		return function() {
			var region = el.region()

			unit.equal(true, parseInt(region[test[0]], 10) > test[1])
			unit.equal(true, parseInt(region[test[0]], 10) < test[2])
		}
	}

	for (var i in animTests) {
		var animProp = {}
			, test = animTests[i]

		animProp[test[0]] = test[2] 

		var el = n.one('#' + i)

		el.anim(animProp, 0.05).wait(0.06).popAnim()

		setTimeout(getCompleteTester(test, el, 2), 50)
		setTimeout(getCompleteTester(test, el, 1), 110)
		
		// Can not check transition support in firefox
		if ( !(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) ){
			setTimeout(getTransitionTester(test, el), 8)
		}
	}

	setTimeout(function() {
		unit.report()
		n.one('#anims').remove()
	}, 200)
})