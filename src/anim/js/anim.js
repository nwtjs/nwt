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

	easing = easing || '';
	duration = duration || 1;

	var trail = ' ' + duration + 's ' + easing,

		// Just support all browsers for now
		cssTransitionProperties = {
			'-webkit-transition': 'all' + trail,
			'-moz-transition': ' all' + trail,
			'-o-transition': ' all' + trail,
			'-ms-transition': ' all' + trail,
			'transition': ' all' + trail
		},

		// Array of attributes to clean
		cleanThese = [];

	for (i in cssTransitionProperties) {
		cleanThese.push(i);
		styles[i] = cssTransitionProperties[i];
	}

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