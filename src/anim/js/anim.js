/**
 * Animation utility
 * @constructor
 */
function NWTAnimate () {
	this.animClass = 'nwt-anim-on';
}

NWTAnimate.prototype = {

/**
 * Initializes CSS for transforms
 */
init: function(duration, easing) {
	
	var newStylesheet = localnwt.node.create('<style type="text/css"></style>');

	easing = easing || 'ease-in';
	duration = duration || 1;

	var trail = ' ' + duration + 's ' + easing,

		// Just support all browsers for now
		cssTransitionProperties = {
			'-webkit-transition': 'all' + trail,
			'-moz-transition': ' all' + trail,
			'-o-ransition': ' all' + trail,
			'ms-transition': ' all' + trail,
			'transition': ' all' + trail
		},

		newContent = '';

	for (i in cssTransitionProperties) {
		newContent += i + ': ' + cssTransitionProperties[i] + ';';
	}
	newStylesheet.setHtml('.' + this.animClass + '{' + newContent + '}');

	localnwt.one('head').append(newStylesheet);

	setTimeout(function(){
		newStylesheet.remove()
	}, 
	duration*1001)
},


/**
 * Method to animate a node
 * @param object NWTNode instance
 * @param object Object of styles to animate. E.g., {top: 10}
 * @param integer Duration in seconds to animate
 * @param string Easing type. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
 */
anim: function(node, styles, duration, easing) {

	animation.init(duration, easing);

	node.fire('anim:start', [styles, duration, easing])

	setTimeout(function(){
		node.fire('anim:done', [styles, duration, easing])
	}, duration*1000)

	// Need to be sure to implement the transition function first
	node.addClass(animation.animClass);
	
	node.setStyles(styles);


	return node;
}
};

var animation = new NWTAnimate();
localnwt.anim = animation.anim;