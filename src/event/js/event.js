/**
 * NWTEventInstance Class
 * Event object wrapper
 * @constructor
 */
function NWTEventInstance (e) {
	this._e = e;
	this.target = new NWTNodeInstance(e.target);
}

NWTEventInstance.prototype = {
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
}


NWTEvent.prototype = {

/**
 * Adds a live listener to the page
 * This allows us to update page components,
 * and still have javascript function properly
 * @param string Attribute to check on
 * @param regex Pattern to match against the string
 * @param function callback if matched
 */
live: function(attribute, pattern, callback) {

	var classPattern = new RegExp(pattern);

	nwt.one('body').on('click', 
	function(e) {

		if (e.target.getAttribute(attribute).match(pattern)) {
			callback(e.target);
		}

		// If we found a callback, we usually want to stop the event
		// Except for input elements (still want checkboxes to check and stuff)
		if( e.target.get('nodeName').toUpperCase() !== "INPUT") {
			e.stop();
		}

		return;
	});
},

/**
 * Adds an event listener
 * @param object toImplement Any object which can be evented.
 * @param string Name Event name
 * @param function Callback Event callback
 * @param object context Execution context
 * @param bool once If true, discards the event callback after is runs
 */
on: function (implementOn, event, callback, context, once) {

	var wrappedCallback = function (e){
		var eventWrapper = new NWTEventInstance(e);

		callback.call(implementOn, eventWrapper);

		if (once) {
			implementOn.removeEventListener(event, wrappedCallback);
		}
	};

	implementOn.addEventListener(event, wrappedCallback);
},

/**
 * Removes an event listener from an eventable object
 * @param string Name Event name
 * @param function Callback Event callback
 */
off: function (implementOn, event, callback) {
	implement.on.removeEventListener(event, callback);
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
	return this._node.addEventListener(ev, fn);
};
NWTNodeInstance.prototype.removeEventListener = function(ev, fn) {
	return this._node.removeEventListener(ev, fn);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::on
 */
NWTNodeInstance.prototype.on = function(event, fn, context) {
	return nwt.event.on(this, event, fn, context);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::once
 */
NWTNodeInstance.prototype.once = function(event, fn, context) {
	return nwt.event.on(this, event, fn, context, true);
};


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::off
 */
NWTNodeInstance.prototype.off = function(event, fn) {
	return nwt.event.off(this, event, fn);
};