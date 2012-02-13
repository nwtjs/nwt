/**
 * Animation utility
 * @constructor
 */
function NWTAnimate () {

}

/**
 * Method to animate a node
 * @param object NWTNode instance
 * @param object Object of styles to animate. E.g., {top: 10}
 * @param integer Duration in seconds to animate
 * @param string Easing type. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
 */
NWTAnimate.prototype.anim = function(node, styles, duration, easing) {

	easing = easing || 'ease-in-out';
	duration = duration || 1;

	var trail = ' ' + duration + 's ' + easing,

		// Just support all browsers for now
		cssTransitionProperties = {
			'WebkitTransition': 'all' + trail,
			'MozTransition': ' all' + trail,
			'OTransition': ' all' + trail,
			'MsTransition': ' all' + trail,
			'transition': ' all' + trail
		},

		// Array of attributes to clean
		cleanThese = [];

	for (i in cssTransitionProperties) {
		cleanThese.push(i);
	}

	// Need to be sure to implement the transition function first
	node.setStyles(cssTransitionProperties);
	node.setStyles(styles);
	setTimeout(function() {
		node.removeStyles(cleanThese);
	}, duration*1000);
	return node;
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