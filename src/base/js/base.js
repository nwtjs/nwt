/*!
 * NWT primary entry point
 * @constructor
 */
function NWT() {

};

NWT.prototype = {

/**
 * Implements an interface on an object
 */
implement: function(implClass, modClass) {

	var impls = {
		DelayableQueue : [
			/**
			 * Returns a queueable interface to the original object
			 * This allows us to insert delays between chainable method calls
			 * Methods outside the scope of the chain are not delayed
			 * E.g. if a method performs setTimeout, followed by a wait, 
			 * methods in the setTimeout call are not delayed.
			 */
			'wait', function () {

				/**
				 * Queueable object which implements methods from another interface
				 * @param object Context for the callback
				 */
				function QueueableObject(context) {
					this.queue = [];
					this.context = context;
					this.inProgress = false;
				}
				
				QueueableObject.prototype = {
					_add: function(func, args) {

						var self = this;

						self.queue.push({type: 'chain', func: func, args: args});
						if (!self.inProgress) {
							return self._process();
						}
					},

					/**
					 * Process the queue
					 * Shifts an item off the queue and waits for it to finish
					 */
					_process: function() {

						var self = this, item;

						self.inProgress = true;
						
						if (!self.queue.length) {
							return;
						}
						
						item = self.queue.shift();

						if (item.type == 'wait') {
							setTimeout(function(){
								self._process();
							}, item.duration*1000);
						} else {
							self.context = item.func.apply(self.context, item.args);
							self._process();
						}
						return self;
					},

					/**
					 * Updates the current delay timer
					 */
					wait: function(duration) {
						this.queue.push({type: 'wait', duration: duration});
						return this;
					}
				};
				
				return function (duration) {

					var self = this,
						mockObj = new QueueableObject(self);

					/**
					 * Returns an executable function
					 * uses setTimeout and the total queueTimer
					 */
					getQueuedFunction = function(func) {
						return function() {
							mockObj._add(func, arguments);
							return mockObj;
						}
					};

					/**
					 * Wrap all class functions
					 * We can unwrap at the end if the current wait is 0
					 */
					for( var i in self ) {
						if (typeof self[i] != 'function' || i == 'wait' ) { continue; }
						mockObj[i] = getQueuedFunction(self[i]);
					}

					mockObj.wait(duration);
					
					return mockObj;
				}
			}
		]
	};

	modClass[impls[implClass][0]] = impls[implClass][1]();
},

/**
 * Declares a class on the n.* namespace
 * This allows us to play with the prototype and do other things later
 */
declare: function(name, clazz) {
	if (!nwt.classList) {
		nwt.classList = {};
	}

	nwt.classList[name] = clazz;
},

/**
 * Augments a class namespaced on n.classList
 */
augment: function(name, fnName, fn) {
	console.log('Augmenting', name, fnName, fn + '')
	nwt.classList[name].prototype[fnName] = fn; 
}
};

window.nwt = window.n = new NWT();