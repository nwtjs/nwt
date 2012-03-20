/**
 * Simple test script for unit testing javascript
 */

function NWTUnitTestFramework() {
	this.passedTests = 0;
	this.failedTests = 0;
	this.assertionCount = 0;
	this.description = null;
}

/**
 * Adds an error message to the console
 */
NWTUnitTestFramework.prototype.addError = function() {
	this.failedTests++;
	var errorMessage = 'Test failed ' + ( this.description ? this.description : 'null' );
	console.error(errorMessage, arguments)
	return this;
};

/**
 * Provides the description of the test
 */
NWTUnitTestFramework.prototype.describe = function(description) {
	//console.log('Describing', description)
	this.description = description;
	return this;
};

/**
 * Called when we pass a test
 * Increment the counter and return self
 */
NWTUnitTestFramework.prototype.pass = function() {
	this.passedTests++;
	return this;
};

/**
 * Setup method for a test (optional)
 */
NWTUnitTestFramework.prototype.setup = function(bodyContent) {
	nwt.one('#root').setHtml(bodyContent);
	return this;
};

/**
 * Report results
 */
NWTUnitTestFramework.prototype.report = function() {
	console.info(this.passedTests + ' tests passed. ', this.assertionCount + ' assertions.');
};

/**
 * Validates that all arguments are equal
 */
NWTUnitTestFramework.prototype.equal = function() {
	var firstTest = typeof arguments[0] == 'function' ? arguments[0]() : arguments[0],
		numArgs = arguments.length,
		i;

	// Cast to lowercase for IE
	// Consider having node class return lowercase
	if (firstTest && firstTest.toLowerCase) {
		firstTest = firstTest.toLowerCase();
	}
	
	this.assertionCount += arguments.length;

	for (i = 1; i < numArgs; i += 1) {
		var result = typeof arguments[i] == 'function' ? arguments[i]() : arguments[i];

		// Cast to lowercase for IE
		// Consider having node class return lowercase
		if (result && result.toLowerCase) {
			result = result.toLowerCase();
		}
		
		if( result != firstTest ) {
			return this.addError('Arguments not equal.', result, firstTest);
		}
	}
	return this.pass();
};

/**
 * Validates that all arguments results are true
 */
NWTUnitTestFramework.prototype.isTrue = function() {
	var numArgs = arguments.length,
		i;

	this.assertionCount += arguments.length;

	for (i = 0; i < numArgs; i += 1) {
		if( !arguments[i]() ) {
			return this.addError('Arguments not true.', arguments);
		}
	}
	return this.pass();
};

/**
 * Validates that all arguments results are false
 */
NWTUnitTestFramework.prototype.isFalse = function() {
	var numArgs = arguments.length,
		i;

	this.assertionCount += arguments.length;

	for (i = 0; i < numArgs; i += 1) {
		if( arguments[i]() ) {
			return this.addError('Arguments not false.', arguments);
		}
	}
	return this.pass();
};


/**
 * Alternative way to run a test
 * Passes in the unit framework refrence and allows async assertions
 */
NWTUnitTestFramework.prototype.run = function(callback) {
	callback(this);
	return this;
};

nwt.unit = new NWTUnitTestFramework();
