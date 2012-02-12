/**
 * NWTEventInstance Class
 * Event object wrapper
 * @constructor
 */
function NWTEventInstance (e) {
	this._e = e;
}


/**
 * Halts the event
 * Calls NWTEventInstance stopDefault and stopBubble
 */
NWTEventInstance.prototype.halt = function() {
	return this.stopBubble().stopDefault();
};


/**
 * Prevents the default action of the event
 */
NWTEventInstance.prototype.stopDefault = function() {
	this._e.preventDefault();
	return this;
};


/**
 * Stops the propagation of the event
 */
NWTEventInstance.prototype.stopBubble = function() {
	this._e.stopPropagation();
	return this;
};


/**
 * NWTEvent Class
 * Event class
 * @constructor
 */
function NWTEvent() {
}


/**
 * Adds an event listener
 * @param object toImplement Any object which can be evented.
 * @param string Name Event name
 * @param function Callback Event callback
 * @param object context Execution context
 * @param bool once If true, discards the event callback after is runs
 */
NWTEvent.prototype.on = function (implementOn, event, callback, context, once) {

	var wrappedCallback = function (e){
		var eventWrapper = new NWTEventInstance(e);

		callback.call(implementOn, eventWrapper);

		if (once) {
			implementOn.removeEventListener(event, wrappedCallback);
		}
	};
	
	implementOn.addEventListener(event, wrappedCallback);
};

nwt.event = new NWTEvent();

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