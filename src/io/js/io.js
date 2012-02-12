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


/**
 * Returns the non-parse responseText
 */
NWTIOResponse.prototype.toString = function () {
	return this.request.responseText;
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

/**
 * Runs the IO call
 * @param string Type of call
 */
NWTIO.prototype._run = function() {
	var mythis = this;
	this.req.onreadystatechange = function() {		
		var callback;

		if (mythis.req.readyState == 4 && mythis.req.status == 200) {
			callback = 'success';
		} else if (mythis.req.readyState == 4) {
			callback = 'failure';
		}

		if (callback && mythis.config[callback]) {
			var response = new NWTIOResponse(mythis.req);
			mythis.config[callback](response);
		}
	};

	this.req.send(this.ioData ? this.ioData : null);
	return this;
};


/**
 * Runs IO POST
 * We also use post for PUT or DELETE requests
 */
NWTIO.prototype.post = function(data, method) {

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
};


/**
 * Runs IO GET
 */
NWTIO.prototype.get = function() {
	this.req.open('GET', this.url);
	return this._run();
};


/**
 * Runs IO PUT
 */
NWTIO.prototype.put = function(data) {
	return this.post('?' + data, 'PUT');
};


/**
 * Runs IO DELETE
 */
NWTIO.prototype['delete'] = function(data) {
	return this.post('?' + data, 'DELETE');	
};


/**
 * Aborts this request
 */
NWTIO.prototype.abort = function() {
	this.req.abort();
	return this;
};


nwt.io = function() {
	return new NWTIO(arguments);
};