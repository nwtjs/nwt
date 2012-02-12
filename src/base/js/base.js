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

				var delay = 0;

				return function (duration) {

					delay += (duration*1000);

					var self = this,

					funcCache = {},

					/**
					 * Returns an executable function
					 * uses setTimeout and the total queueTimer
					 */
					getQueuedFunction = function(func) {

						funcCache[func] = self[func];

						return function() {
							//console.log('Queuing ', func, 'for ', delay, 'seconds')
							var args = [],
								i,
								argLen = arguments.length;

							for (i = 0; i < argLen ; i++ ) {
								args.push(arguments[i]);
							}

							if( delay <= 0 ) {
								return funcCache[func].apply(self, args);
							}

							setTimeout(function() {
								delay -= (duration*1000);
								funcCache[func].apply(self, args);
								console.log('Timeout done', func, args)
							}, delay);
							return self;
						}
					};

					console.log('waiting for ', duration, delay)

					/**
					 * Wrap all class functions
					 * We can unwrap at the end if the current wait is 0
					 */
					for( var i in self ) {
						if (typeof self[i] != 'function' || i == 'wait' ) { continue; }
						self[i] = getQueuedFunction(i);
					}

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