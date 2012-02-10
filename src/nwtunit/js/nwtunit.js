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
	nwt.one('#root').setContent(bodyContent);
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
	var firstTest = arguments[0](),
		numArgs = arguments.length,
		i;

	this.assertionCount += arguments.length;

	for (i = 1; i < numArgs; i += 1) {
		var result = arguments[i]();
		if( result != firstTest ) {
			return this.addError('Arguments not equal.', result, firstTest);
		}
	}
	return this.pass();
};

/**
 * Validates that all arguments results are true
 */
NWTUnitTestFramework.prototype.true = function() {
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
NWTUnitTestFramework.prototype.false = function() {
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

nwt.unit = new NWTUnitTestFramework();
