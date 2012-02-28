/**
 * Individually wrapped NWTNode
 * @constructor
 */
function NWTNodeInstance(node) {
	nwt.implement('DelayableQueue', this);
	this._node = node;
}

NWTNodeInstance.prototype = {

/**
 * Gets the region of a node (top, left, bottom, right)
 */
region: function() {

	/**
	 * Gets a cascaded style of a node
	 * @param object Node that we are traversing
	 * @param string Attribute we are adding
	 */
	var getCascadedAttr = function(node, attr) {
		var total = 0,
			offsetNode = node._node;

		do {
			var thisLevel = parseInt(offsetNode[attr], 10);
			if (thisLevel) {
				total += thisLevel;
			}

		} while (offsetNode = offsetNode.offsetParent);

		return total;
	},

	region = {
		width: this.get('offsetWidth'),
		height: this.get('offsetHeight'),
		left:getCascadedAttr(this, 'offsetLeft'),
		top:getCascadedAttr(this, 'offsetTop')
	};

	region.bottom = region.top + region.height;
	region.right = region.left + region.width;

	return region;
},


/**
 * Checks if a given node intersects another
 * @param object Node to check against
 */
intersects: function(other) {
	var me = this.region(),
		you = other.region();

	return !(
			me.left > you.right ||
			me.right < you.left ||
			me.top > you.bottom ||
			me.bottom < you.top ||

			you.left > me.right ||
			you.right < me.left ||
			you.top > me.bottom ||
			you.bottom < me.top 
	);
},


/**
 * Returns the ancestor that matches the css selector
 * @param string CSS Selector
 */
ancestor: function(selector) {

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
},

parent: function() {
	var parent = new NWTNodeInstance(this._node.parentNode);
	return parent;
},

/**
 * Returns true if the class exists on the node, false if not
 */
hasClass: function(className) {
	return (this._node.className && this._node.className.indexOf(className) !== -1);
},


/**
 * Adds a class to the node
 */
addClass: function(className) {
	if( !this.hasClass(className)  ) {
		this._node.className = this._node.className +  ' ' + className;
	}
	return this;
},


/**
 * Removes a class from the node.
 */
removeClass: function(className) {
	return this.swapClass(className, '');
},


/**
 * Replaces a class on a node
 * @param string oldClass Old class name
 * @param string newClass New class name
 */
swapClass: function(oldClass, newClass) {
	this._node.className = this._node.className.replace(oldClass, newClass);
	return this;
},


/**
 * Gets a data attribute from the node
 * Pass just whatever comes after data-
 * If the attribute were data-user-id,
 * you should pass 'user-id' to this function
 * @param string Data attribute to get
 */
data: function(property) {
	return this._node.getAttribute('data-' + property);
},


/**
 * Sets a data attribute from the node
 * @param string Data attribute to get
 * @param mixed Value to set
 */
setData: function(property, val) {
	return this._node.setAttribute('data-' + property, val);
},


/**
 * Gets a property from the node object
 * @param string Attribute to get
 */
get: function(property) {

	if( property === 'parentNode' ) {
		var node = this._node[property];
		if( !node ) { return null; }
		return new NWTNodeInstance(node);
	}

	return this._node[property];
},


/**
 * Sets an attribute on the node
 * @param string Attribute to set
 * @param string Value to set
 */
set: function(property, value) {
	this._node[property] = value;
	return this;
},


/**
 * Gets an attribute from the DOM node
 * @param string Attribute to get
 */
getAttribute: function(property) {
	return this._node.getAttribute(property);
},


/**
 * Pass-thru to node.hasAttribute
 * @param string Attribute to test for
 */
hasAttribute: function(property) {
	return this._node.hasAttribute(property);
},


/**
 * Sets an attribute on the DOM node
 * @param string Attribute to set
 */
setAttribute: function(property, value) {
	this._node.setAttribute(property, value);
	return this;
},

/**
 * Resolves JS Styles
 */
_jsStyle: function (name) {
	var lookupMap = {float: 'cssFloat'};

	if (lookupMap[name]) name = lookupMap[name];
	return name;
},


/**
 * Gets a style attribute set on the node
 * @param string Style attribute to get
 */
getStyle: function(property) {

	if( !this.getAttribute('style') ) {
		return '';
	}

	property = this._jsStyle(property);

	var matchedStyle = this._node.style[property];

	if( matchedStyle ) {
		return matchedStyle;
	} else {
		return null;
	}
},


/**
 * Removes a style attribute
 * @param string Style attribute to remove
 */
removeStyle: function(property) {
	return this.removeStyles(property);
},


/**
 * Removes an array of styles from a node
 * @param array Array of styles to remove
 */
removeStyles: function(props) {
	// Default properties to an array
	if (typeof props == 'string') {
		props = [props];
	}

	var i,
		propsLen = props.length;

	for (i = 0; i < propsLen; i += 1) {
		this._node.style[props[i]] = '';
	}
	return this;
},


/**
 * Sets a style attribute
 * @param string Style attribute to set
 * @param string Value to set
 */
setStyle: function(property, value) {
	var newStyle = {};
	newStyle[property] = value;
	return this.setStyles(newStyle);
},


/**
 * Sets multiple styles
 * @param object Object map of styles to set
 */
setStyles: function(newStyles) {

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
		var styleKey = this._jsStyle(i);
		eachStyleVal = newStyles[i];

		// Default the unit if necessary
		if (defaultToUnit[styleKey] && !isNaN(eachStyleVal)) {
			eachStyleVal += defaultToUnit[styleKey];
		}

		this._node.style[styleKey] = eachStyleVal;
	}

	return this;
},


/**
 * Serializes sub children of the current node into post data
 */
serialize: function() {

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
},


/**
 * Gets the content of the node
 */
getContent: function(content) {
	return this._node.innerHTML;
},


/**
 * Sets the content of the node
 * @param string Content to set
 */
setContent: function(content) {
	this._node.innerHTML = content;
	return this;
},


/**
 * Returns the next node
 */
next: function() {

	var node = this._node;

	do node = node.nextSibling;
	while (node && node.nodeType != 1);

	return new NWTNodeInstance(node);
},


/**
 * Returns the previous node
 */
previous: function() {

	var node = this._node;

	do node = node.previousSibling;
	while (node && node.nodeType != 1);

	return new NWTNodeInstance(node);
},


/**
 * Returns a child node instance based on a selector
 * Implements querySelector
 * @param string css selector
 */
one: function(selector) {
	var node = this._node.querySelector(selector);
	return new NWTNodeInstance(node);
},


/**
 * Returns a child nodelist based on a selector
 * Implements querySelector
 * @param string CSS Selector
 */
all: function(selector) {
	var nodelist = this._node.querySelectorAll(selector);
	return new NWTNodeList(nodelist);
},


/**
 * Appends a node instance to this node
 */
append: function(node) {

	if( node instanceof NWTNodeInstance ) {
		node = node._node;
	}

	this._node.appendChild(node);
	return this;
},


/**
 * Removes a node instance from the dom
 */
remove: function() {
	this._node.parentNode.removeChild(this._node);
},


/**
 * Inserts a given node into this node at the proper position
 */
insert: function(node, position) {
	position = position || 'before';

	if( position == 'before'  ) {
		this._node.parentNode.insertBefore(node._node, this._node);
	} else if ( position == 'after' ) {
		this._node.parentNode.insertBefore(node._node, this.next()._node);
	}
},


/**
 * Simulates a click event on a node
 */
click: function() {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);

	return !this._node.dispatchEvent(evt);
}
};


/**
 * NWTNode Class
 * Used for getting elements
 * @constructor
 */
function NWTNode() {
	
}


NWTNode.prototype = {
/**
 * Creates a node from markup
 * @param string Node markup
 */
create: function(markup) {

	var container = document.createElement('div');
	container.innerHTML = markup;

	return new NWTNodeInstance(container.childNodes[0]);
},


/**
 * Returns a NWTNodeInstance class
 * @constructor
 */
one: function(selector) {

	if( typeof selector == 'string' ) {
		var node = document.querySelectorAll(selector);

		if( node.length == 0 ) {
			return null;
		}

		return new NWTNodeInstance(node[0]);
	} else {
		return new NWTNodeInstance(selector);
	}
},


/**
 * Returns a NWTNodeList class
 * @constructor
 */
all: function(selector) {
	var nodelist = document.querySelectorAll(selector);
	return new NWTNodeList(nodelist);
}
};


nwt.node = new NWTNode();
nwt.one = nwt.node.one;