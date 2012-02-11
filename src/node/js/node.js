/**
 * Individually wrapped NWTNode
 * @constructor
 */
function NWTNodeInstance(node) {
	this._node = node;
}


/**
 * Returns the ancestor that matches the css selector
 * @param string css selector
 */
NWTNodeInstance.prototype.ancestor = function(selector) {

	var allMatches = nwt.all(selector),
		testNode = this._node,
		ancestor = null,
		maxDepth = 0;

	if( allMatches.size() == 0 ) {
		return null;
	}

	while( true ) {

		// Iterate through all matches for each parent, and exit as soon as we have a match
		// Pretty bad performance, but super small. TODO: Omtimize
		allMatches.each(function (el) {
			if (el._node == testNode) {
				ancestor = el;
			}
		});

		var parentNode = testNode.parentNode;

		if( ancestor || !parentNode) { break; }
		testNode = parentNode;
	}

	if( ancestor ) {
		return ancestor;
	} else {
		return null;
	}
};

NWTNodeInstance.prototype.parent = function() {
	this._node = this._node.parentNode;
	return this;
};

/**
 * Returns true if the class exists on the node, false if not
 */
NWTNodeInstance.prototype.hasClass = function(className) {
	return (this._node.className && this._node.className.indexOf(className) !== -1);
};


/**
 * Adds a class to the node
 */
NWTNodeInstance.prototype.addClass = function(className) {
	if( !this.hasClass(className)  ) {
		this._node.className = this._node.className +  ' ' + className;
	}
	return this;
};


/**
 * Removes a class from the node.
 */
NWTNodeInstance.prototype.removeClass = function(className) {
	this._node.className = this._node.className.replace(className, '');
	return this;
};


/**
 * Gets a data attribute from the node
 * Pass just whatever comes after data-
 * If the attribute were data-user-id,
 * you should pass 'user-id' to this function
 * @param string Data attribute to get
 */
NWTNodeInstance.prototype.data = function(property) {
	return this._node.getAttribute('data-' + property);
};


/**
 * Gets a property from the node object
 * @param string Attribute to get
 */
NWTNodeInstance.prototype.get = function(property) {

	if( property === 'parentNode' ) {
		var node = this._node[property];
		if( !node ) { return null; }
		return new NWTNodeInstance(node);
	}

	return this._node[property];
};


/**
 * Sets an attribute on the node
 * @param string Attribute to set
 * @param string Value to set
 */
NWTNodeInstance.prototype.set = function(property, value) {
	this._node[property] = value;
	return this;
};


/**
 * Gets an attribute from the DOM node
 * @param string Attribute to get
 */
NWTNodeInstance.prototype.getAttribute = function(property) {
	return this._node.getAttribute(property);
};


/**
 * Sets an attribute on the DOM node
 * @param string Attribute to set
 */
NWTNodeInstance.prototype.setAttribute = function(property, value) {
	this._node.setAttribute(property, value);
	return this;
};


/**
 * Gets a style attribute set on the node
 * @param string Style attribute to get
 */
NWTNodeInstance.prototype.getStyle = function(property) {

	if( !this.getAttribute('style') ) {
		return '';
	}

	var matchedStyle = this.getAttribute('style').match(new RegExp(property + ':([a-zA-Z0-9\-\.]*);'), '');

	if( matchedStyle && matchedStyle[1] ) {
		return matchedStyle[1];
	} else {
		return null;
	}
};


/**
 * Gets the style string of a node after removing styles
 * Does not update the node style
 * @param array Array of styles to remove
 */
NWTNodeInstance.prototype._getRemainingStyles = function(styles) {
	var i,
		styleRegex = [],
		stylesLen = styles.length;

	for (i = 0; i < stylesLen; i += 1) {
		styleRegex.push(styles[i]);
	}

	return this.getAttribute('style').replace(new RegExp('(' + styleRegex.join('|') + '):[a-zA-Z0-9\-]*;'), '');
};


/**
 * Removes a style attribute
 * @param string Style attribute to remove
 */
NWTNodeInstance.prototype.removeStyle = function(property) {
	return this.removeStyles(property);
};


/**
 * Removes an array of styles from a node
 * @param array Array of styles to remove
 */
NWTNodeInstance.prototype.removeStyles = function(props) {
	// Default properties to an array
	if (typeof props == 'string') {
		props = [props];
	}

	return this.setAttribute('style', this._getRemainingStyles(props));
};


/**
 * Sets a style attribute
 * @param string Style attribute to set
 * @param string Value to set
 */
NWTNodeInstance.prototype.setStyle = function(property, value) {
	var newStyle = {};
	newStyle[property] = value;
	return this.setStyles(newStyle);
};


/**
 * Sets multiple styles
 * @param object Object map of styles to set
 */
NWTNodeInstance.prototype.setStyles = function(newStyles) {
	if( !this.getAttribute('style') ) {
		this.setAttribute('style', '');
	}

	var newStyle = '',

		// If the style matches one of the following, and we pass in an integer, default the unit
		// E.g., 10 becomes 10px
		defaultToUnit = {
			top: 'px',
			left: 'px',
			width: 'px',
			height: 'px'
		},

		i,

		eachStyleValue,

		// Keep track of an array of styles that we need to remove
		newStyleKeys = [];

	for( i in newStyles ) {
		eachStyleVal = newStyles[i];

		// Default the unit if necessary
		if (defaultToUnit[i] && !isNaN(eachStyleVal)) {
			eachStyleVal += defaultToUnit[i];
		}

		newStyle += i + ':' + eachStyleVal + ';';
		newStyleKeys.push(i);
	}

	this.setAttribute('style', this._getRemainingStyles(newStyleKeys) + newStyle);

	return this;
};


/**
 * Adds an event listener tot he node
 * @param string Event to listen for
 * @param function Event callback function
 */
NWTNodeInstance.prototype.on = function(event, callback) {
	this._node.addEventListener(event, function(e) {
		callback(new NWTEventWrapper(e));
	}, false);
};


/**
 * Serializes sub children of the current node into post data
 */
NWTNodeInstance.prototype.serialize = function() {

    var retVal = '',

    // Getting ALL elements inside of form element
    els = this._node.getElementsByTagName('*');

    // Looping through all elements inside of form and checking to see if they're "form elements"
    for( var i = 0, el; el = els[i]; i++ ) {
      if( !el.disabled && el.name && el.name.length > 0 ) {
        switch(el.tagName.toLowerCase()) {
          case 'input':
            switch( el.type ) {
              // Note we SKIP Buttons and Submits since there are no reasons as to why we 
              // should submit those anyway
              case 'checkbox':
              case 'radio':
                if( el.checked ) {
                  if( retVal.length > 0 ) {
                    retVal += '&';
                  }
                  retVal += el.name + '=' + encodeURIComponent(el.value);
                }
                break;
              case 'hidden':
              case 'password':
              case 'text':
                if( retVal.length > 0 ) {
                  retVal  += '&';
                }
                retVal += el.name + '=' + encodeURIComponent(el.value);
                break;
            }
            break;
          case 'select':
          case 'textarea':
            if( retVal.length > 0 ) {
              retVal  += '&';
            }
            retVal += el.name  + '=' + encodeURIComponent(el.value);
            break;
        }
      }
    }
    return retVal;
};


/**
 * Gets the content of the node
 */
NWTNodeInstance.prototype.getContent = function(content) {
	return this._node.innerHTML;
};


/**
 * Sets the content of the node
 * @param string Content to set
 */
NWTNodeInstance.prototype.setContent = function(content) {
	this._node.innerHTML = content;
};


/**
 * Returns the next node
 */
NWTNodeInstance.prototype.next = function() {
	var node = this._node.nextSibling;
	return new NWTNodeInstance(node);
};


/**
 * Returns the previous node
 */
NWTNodeInstance.prototype.previous = function() {
	var node = this._node.previousSibling;
	return new NWTNodeInstance(node);
};


/**
 * Returns a child node instance based on a selector
 * Implements querySelector
 * @param string css selector
 */
NWTNodeInstance.prototype.one = function(selector) {
	var node = this._node.querySelector(selector);
	return new NWTNodeInstance(node);
};


/**
 * Returns a child nodelist based on a selector
 * Implements querySelector
 * @param string css selector
 */
NWTNodeInstance.prototype.all = function(selector) {
	var nodelist = this._node.querySelectorAll(selector);
	return new NWTNodeList(nodelist);
};


/**
 * Appends a node instance to this node
 */
NWTNodeInstance.prototype.append = function(node) {

	if( node instanceof NWTNodeInstance ) {
		node = node._node;
	}

	this._node.appendChild(node);
	return this;
};


/**
 * Removes a node instance from the dom
 */
NWTNodeInstance.prototype.remove = function() {
	this._node.parentNode.removeChild(this._node);
};


/**
 * Inserts a given node into this node at the proper position
 */
NWTNodeInstance.prototype.insert = function(node, position) {
	position = position || 'before';

	if( position == 'before'  ) {
		this._node.parentNode.insertBefore(node._node, this._node);
	} else if ( position == 'after' ) {
		this._node.parentNode.insertBefore(node._node, this.next()._node);
	}
};


/**
 * Simulates a click event on a node
 */
NWTNodeInstance.prototype.click = function() {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent('click', true, true ); // event type,bubbling,cancelable
	return !this._node.dispatchEvent(evt);
};


/**
 * Waits a certain amount of time before running
 * chained callbacks
 * @param integer Amount of time in seconds to wait
 */
NWTNodeInstance.prototype.wait = function(seconds) {

	function DelayableTask() {
		
	}

	setTimeout(function () {
		runChain();
	}, seconds * 1000);

	return new DelayableTask();
};


/**
 * NWTNode Class
 * Used for getting elements
 * @constructor
 */
function NWTNode() {
	
}


/**
 * Creates a node from markup
 * @param string Node markup
 */
NWTNode.prototype.create = function(markup) {

	var container = document.createElement('div');
	container.innerHTML = markup;

	return new NWTNodeInstance(container.childNodes[0]);
};


/**
 * Returns a NWTNodeInstance class
 * @constructor
 */
NWTNode.prototype.one = function(selector) {

	if( typeof selector == 'string' ) {
		var node = document.querySelectorAll(selector);

		if( node.length == 0 ) {
			return null;
		}

		return new NWTNodeInstance(node[0]);
	} else {
		return new NWTNodeInstance(selector);
	}
};


/**
 * Returns a NWTNodeList class
 * @constructor
 */
NWTNode.prototype.all = function(selector) {
	var nodelist = document.querySelectorAll(selector);
	return new NWTNodeList(nodelist);
};


nwt.node = new NWTNode();
nwt.one = nwt.node.one;