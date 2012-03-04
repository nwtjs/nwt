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

	if (nwt.one('#nwt-anim-styles')) {
		nwt.one('#nwt-anim-styles').remove();
	}
	
	var newStylesheet = nwt.node.create('<style type="text/css" id="nwt-anim-styles"></style>');

	easing = easing || 'ease-in-out';
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

		// Array of attributes to clean
		cleanThese = [],

		newContent = '';

	for (i in cssTransitionProperties) {
		cleanThese.push(i);
		newContent += i + ': ' + cssTransitionProperties[i] + ';';
	}
	newStylesheet.setHtml('.' + this.animClass + '{' + newContent + '}');

	nwt.one('head').append(newStylesheet);
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

	// Need to be sure to implement the transition function first
	node.addClass(animation.animClass);
	node.setStyles(styles);

	return node;
}
};

var animation = new NWTAnimate();
nwt.anim = animation.anim;


/**
 * Implement a node API to animate
 * @see NWTAnimate::anim
 */
NWTNodeInstance.prototype.anim = function(styles, duration, easing) {
	return nwt.anim(this, styles, duration, easing);
};