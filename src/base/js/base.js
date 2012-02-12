/*!
 * NWT primary entry point
 * @constructor
 */
function NWT() {

};


/**
 * Lazy implementation method
 */
NWT.prototype.implement = function(implClass, modClass) {

	var impls = {
		DelayableQueue : [
			'wait', function () {
				var queue = [],

					inprogress = true;

					getQueuedFunction = function (callback) {
						return function () {
							if( inprogress ) {
								queue.push([callback, arguments, this]);
								return this;
							} else {
								return callback.apply(this, arguments);
							}
						}
					},
	
					/**
					 * Flushes the queue
					 * Gets the queue entry, and makes the callback
					 * Calls the next item to be flushed
					 */
					flushQueue = function(context) {
						while (queue.length) {
							var entry = queue.shift(),
								result;

							result = entry[0].apply(context, entry[1]);
							flushQueue(result);
						}
					};
				
				return function (duration) {
					var self = this;

					for( var i in self ) {
						if (typeof self[i] != 'function') { continue; }
						this[i] = getQueuedFunction.call(self, self[i]);
					}
	
					// Flush the delayed queue
					setTimeout(function() {
						inprogress = false;
						flushQueue(self);
					}, duration * 1000);
	
					return self;
				}
			}
		]
	};

	modClass[impls[implClass][0]] = impls[implClass][1]();
};

var nwt = new NWT();

/*! 
 * Global window object with a reference to the nwt object
 * This is so we can share libraries client and server side
 */
window.nwt = nwt;