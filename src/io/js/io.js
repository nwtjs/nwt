/**
 * Wraps an XHR response object 
 * This allows us to parse on demand with o.obj()
 * The toString method will also spit out the flat response
 * @param object XHR request
 */
function NWTIOResponse (request) {
	this.request = request;
	try {
		this.obj = JSON.parse(request.responseText);
	} catch(e) {}
}

NWTIOResponse.prototype = {
/**
 * Returns the non-parse responseText
 */
toString: function () {
	return this.request.responseText;
}
};


/**
 * Provides ajax communication methods
 * The folllowing methods are chainable
 * success - success handler
 * failure - failure handler
 * serialize - serialize a form, selector, array, or object to send
 * @constructor
 */
function NWTIO(args) {
	this.req = new XMLHttpRequest();
	this.config = {};
	this.url = args[0];

	// Data to send as
	this.ioData = '';

	var chainableSetters = ['success', 'failure', 'serialize'],
		i,
		setter,
		mythis = this,

		// Returns the setter function
		getSetter = function (setter) {
			return function (value) {
				mythis.config[setter] = value;
				return this;
			}
		};

	for (i = 0, setter; setter = chainableSetters[i]; i++) {
		this[setter] = getSetter(setter);
	}
}

NWTIO.prototype = {
/**
 * Runs the IO call
 * @param string Type of call
 */
_run: function() {
	var mythis = this;
	this.req.onload = function() {
		if (mythis.config.success) {
			var response = new NWTIOResponse(mythis.req);
			mythis.config.success(response);
		}
	};

	this.req.onerror = function() {
		if (mythis.config.failure) {
			var response = new NWTIOResponse(mythis.req);
			mythis.config.failure(response);
		}
	};

	this.req.send(this.ioData ? this.ioData : null);
	return this;
},


/**
 * Runs IO POST
 * We also use post for PUT or DELETE requests
 */
post: function(data, method) {

	var urlencodedForm = true;
	
	if (typeof data == 'string') {
		this.ioData = data;
	} else if (typeof data == 'object' && data._node) {

		if (data.getAttribute('enctype')) {
			urlencodedForm = false;
		}
		
		this.ioData = new FormData(data._node);
	}

	var req = this.req,
		method = method || 'POST';

	req.open(method, this.url);

	//Send the proper header information along with the request
	// Send as form encoded if we do not have a file field
	if (urlencodedForm) {
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	return this._run();
},


/**
 * Runs IO GET
 * @param string We update the URL if we receive data to GET here
 */
get: function(data) {

	// Strip out the old query string and append the new one
	if (data) {
		this.url = this.url.split('?', 1)[0] + '?' + data;
	}

	this.req.open('GET', this.url);
	return this._run();
},


/**
 * Runs IO PUT
 */
put: function(data) {
	return this.post('?' + data, 'PUT');
},


/**
 * Runs IO DELETE
 */
'delete': function(data) {
	return this.post('?' + data, 'DELETE');	
},


/**
 * Aborts this request
 */
abort: function() {
	this.req.abort();
	return this;
}
};


localnwt.io = function() {
	return new NWTIO(arguments);
};