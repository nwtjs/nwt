/**
 * NWTEventInstance Class
 * Event object wrapper
 * @param event Event object
 * @param object (Optional) attributes to populate the event object with
 * @constructor
 */
function NWTEventInstance (e, attrs) {
	this._e = e;
	this.target = new NWTNodeInstance(e.target);

	for (var i in attrs) {
		this[i] = attrs[i];
	}
}

NWTEventInstance.prototype = {

/**
 * Interface to get the keycode
 */
code: function() {
	return this._e.keyCode;
},


/**
 * Stops the event totally
 * Calls NWTEventInstance noDefault and noBubble
 */
stop: function() {
	return this.noBubble().noDefault();
},


/**
 * Prevents the default action of the event
 */
noDefault: function() {
	this._e.preventDefault();
	return this;
},


/**
 * Stops the propagation of the event
 */
noBubble: function() {
	this._e.stopPropagation();
	return this;
}
};


/**
 * NWTEvent Class
 * Event class
 * @constructor
 */
function NWTEvent() {
	// Cached events which have been added
	// Cache the wrapped events so if the user calls node.off(...)
	// we can easily look up the function reference
	this._cached = {};

	// Cached event data for custom events
	this._eventData = [];
}


NWTEvent.prototype = {

/**
 * Adds a live listener to the page
 * This allows us to update page components,
 * and still have javascript function properly
 * @param string Attribute to check on
 * @param regex Pattern to match against the string
 * @param function callback if matched
 * @param string Type of listener to use, one of: click | mousemove | mouseout
 */
live: function(attribute, pattern, callback, interaction) {

	var classPattern = new RegExp(pattern),

		interaction = interaction || 'click',

		maxSearch,

		dispatcher,

		body = nwt.one('body');

	// Currently only search one level for a mouse listener for performance reasons
	if (interaction == 'click') {
		maxSearch = 100;
	} else {
		maxSearch = 1;
	}

	dispatcher = 
	function(e) {

		var originalTarget = e.target,
			target = originalTarget,

			// Did we find it?
			found = true,

			// Keep track of how many times we bubble up
			depthSearched = 0;

		while(target._node && target._node.parentNode) {

			if (target._node == nwt.one('body')._node || depthSearched >= maxSearch) { break; }

			if (target.hasAttribute(attribute)) {

				var matches = target.getAttribute(attribute).match(pattern);

				if (matches) {
					callback(originalTarget, matches);
	
					// If we found a callback, we usually want to stop the event
					// Except for input elements (still want checkboxes to check and stuff)
					if( target.get('nodeName').toUpperCase() !== "INPUT") {
						e.stop();
					}

					break;
				}
			}

			depthSearched++;
			target = target.parent();
		};

		return;
	};


	var enableListener = function() {
		body.on(interaction, dispatcher);
	};
	enableListener();

	if (interaction !== 'click') {

		// Disable mouseover listeners on scroll
		var timer = false;

		nwt.one(document).on('scroll', function() {

			body.off(interaction, dispatcher);

			if (timer) {
				clearTimeout(timer);
				timer = false;
			}
			timer = setTimeout(enableListener, 75);
		});
	}
},


/**
 * Wraps an event callback so we can attach/detach it
 */
_getEventCallback: function(implementOn, event, callback, selector, context, once) {
	var wrappedListener = function (e){

		var eventWrapper = new NWTEventInstance(e),

		selfCallee = arguments.callee,

		returnControl = function() {
			// Call the callback
			// Prepend the wrapped event onto the argument list so we can expect what arguments we get
			nwt.event._eventData.unshift(eventWrapper);
			callback.apply(implementOn, nwt.event._eventData);
			nwt.event._eventData = [];

			if (once) {
				implementOn.removeEventListener(event, selfCallee);
			}
		};

		if (selector) {
			implementOn.all(selector).each(function(userEl) {
				if (userEl._node == eventWrapper.target._node) {
					returnControl();
				}
			});
			return;
		}
		returnControl();
	};

	this._cached[callback.toString()] = {
		fn: wrappedListener
	}

	return wrappedListener;
},


/**
 * Adds an event listener
 * @param object toImplement Any object which can be evented.
 * @param string Name Event name
 * @param function Callback Event callback
 * @param string CSS selector for event bubbling
 * @param object context Execution context
 * @param bool once If true, discards the event callback after is runs
 */
on: function (implementOn, event, callback, selector, context, once) {

	// Only add one copy per listener to an element
	// If the listener is cached, remove the listener
	if (this._cached[callback.toString()] ) {
		this.off.apply(this, arguments);
	}

	implementOn.addEventListener(event, this._getEventCallback.apply(this, arguments));
	return implementOn;
},

/**
 * Removes an event listener from an eventable object
 * @param string Name Event name
 * @param function Callback Event callback
 */
off: function (implementOn, event, callback) {
	var stringy = callback.toString();
	if (!this._cached[stringy] || !this._cached[stringy].fn) { return; }
	implementOn.removeEventListener(event, this._cached[stringy].fn);
},

/**
 * Fires a callback when the dom is ready
 */
ready: function(fn) {
	/*!
	 * contentloaded.js
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 *
	 */
	
	// @win window reference
	// @fn function reference

	var done = false,
		top = true,

		win = window,

		doc = win.document, root = doc.documentElement,
	
		add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
		rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
		pre = doc.addEventListener ? '' : 'on',
	
		init = function(e) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},
	
		poll = function() {
			try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}
}

};


nwt.event = new NWTEvent();

nwt.ready = nwt.event.ready;


/**
 * Stub out the Node addEventListener/removeEventListener interfaces
 */
NWTNodeInstance.prototype.addEventListener = function(ev, fn) {
	return this._node.addEventListener(ev, fn, false);
};
NWTNodeInstance.prototype.removeEventListener = function(ev, fn) {
	return this._node.removeEventListener(ev, fn, false);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::on
 */
NWTNodeInstance.prototype.on = function(event, fn, selector, context) {	
	return nwt.event.on(this, event, fn, selector,context);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::once
 */
NWTNodeInstance.prototype.once = function(event, fn, selector, context) {
	return nwt.event.on(this, event, fn, selector, context, true);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::off
 */
NWTNodeInstance.prototype.off = function(event, fn) {
	return nwt.event.off(this, event, fn);
};


/**
 * Fires an event on a node
 */
NWTNodeInstance.prototype.fire = function(event, callback) {	
	var args = Array.prototype.slice.call(arguments, 1);

	nwt.event._eventData = args;

	var customEvt = document.createEvent("UIEvents");
	customEvt.initEvent(event, true, false);
	this._node.dispatchEvent(customEvt);
};
