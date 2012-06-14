var fxObj = {
	// <id> : { ..obj mapping.. }
}

/**
 * Individually wrapped NWTNode
 * @constructor
 */
function NWTNodeInstance(node) {
	localnwt.implement('DelayableQueue', this);
	this._node = node;
}
n.declare('Node', NWTNodeInstance);

NWTNodeInstance.prototype = {

/**
 * Gets the region of a node (top, left, bottom, right)
 */
region: function() {

	var region = {
		width: this.get('offsetWidth'),
		height: this.get('offsetHeight')
	},

	box = this._node.getBoundingClientRect(),

	doc = document,
	docElem = doc.documentElement,
	body = doc.body,
	win = window,

	clientTop  = docElem.clientTop  || body.clientTop  || 0,
	clientLeft = docElem.clientLeft || body.clientLeft || 0,
	scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop,
	scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	region.top  = box.top  + scrollTop  - clientTop,
	region.left = box.left + scrollLeft - clientLeft;

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

	var allMatches = localnwt.all(selector),
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
		var styleKey = this._jsStyle(i),
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
 * Gets the html of the node
 */
getHtml: function() {
	return this._node.innerHTML;
},


/**
 * Sets the html of the node
 * @param string Html to set
 */
setHtml: function(html) {
	var self = this,
		processScripts,
		scriptTags;

	self._node.innerHTML = html;

	// Re-append any script tags introduced
	// We need to synchronously process them
	scriptTags = self.all('script');
	processScripts = function() {

		var rawEl = scriptTags.nodes.shift();

		if (!rawEl || !rawEl._node) {
			return;
		}

		// If there is script html, eval it instead of appending it
		var scriptSrc = rawEl.getAttribute('src');

		if (scriptSrc) {
			var newScript = document.createElement('script'),
				done;

			newScript.type = "text/javascript";
			newScript.src = scriptSrc;
	
			newScript.onload = newScript.onreadystatechange = function() {
				if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
					done = true;
					processScripts();
				}
			};

			self._node.appendChild(newScript);
		} else if (rawEl.get('text')){
			var evalRef = eval
			evalRef(rawEl.get('text'));
			processScripts();
		}
	}
	try {
		processScripts();
	}catch(e){}

	return this;
},


/**
 * Passthrough to node.get('val')
 */
val: function() {
	return this.get('value');
},

/**
 * Finds a node based on direction
 * @param string Native method to iterate nodes {previous | next}
 * @param string criteria CSS selector or Filtering function
 */
_find: function(method, criteria) {
	// Iterate on the raw node
	var node = this._node,

		// Method to iterate on
		siblingType = method + 'Sibling',

		// Filter to test the node
		filter,

		validItems;

	// CSS Selector case
	if (typeof criteria == "string") {
		validItems = n.all(criteria);
		filter = function(rawNode) {
			var found = false;
			
			validItems.each(function(el){
				if (rawNode == el._node) {
					found = true;
				}
			});
			return found;
		}; 

	// Default the filter to return true
	} else if (!criteria) {
		filter = function(){ return true }
	} else {
		filter = function(rawEl) {
			return criteria(new NWTNodeInstance(rawEl));
		}
	}

	while(node) {
		node = node[siblingType];

		if (node && node.nodeType == 1 && filter(node)) {
			break;
		}	
	}

	return node ? new NWTNodeInstance(node) : null;
},

/**
 * Returns the next node
 */
next: function(filter) {
	return this._find('next', filter)
},


/**
 * Returns the previous node
 */
previous: function(filter) {
	return this._find('previous', filter)
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
 * Appends the current node to another node
 * @param {string|object} Either a CSS selector, or node instance
 * @return object The node that we appended the current node to
 */
appendTo: function(node) {

	var newParent = ( node instanceof NWTNodeInstance ) ? node : localnwt.one(node);

	newParent.append(this);

	return this;
},


/**
 * Prepends a node to the beginning of the children of this node
 */
prepend: function(node) {

	if( node instanceof NWTNodeInstance ) {
		node = node._node;
	}

	var child = this.one('*');

	this._node.insertBefore(node, (child._node? child._node : null));
	
	return this;
},


/**
 * Inserts the current node into another node
 * @param {string|object} Either a CSS selector, or node instance
 * @param string Position to insert at. Defaults to 'before'
 * @return object The node that we inserted the current node into
 */
insertTo: function(node, position) {

	var newParent = ( node instanceof NWTNodeInstance ) ? node : localnwt.one(node);

	newParent.insert(this, position);

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
		this._node.parentNode.insertBefore(node._node, this.next() ? this.next()._node : null);
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
},


// Begin NWT Event hooks
/**
 * Stub out the Node addEventListener/removeEventListener interfaces
 */
addEventListener: function(ev, fn) {
	return this._node.addEventListener(ev, fn, false);
},
removeEventListener: function(ev, fn) {
	return this._node.removeEventListener(ev, fn, false);
},


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::on
 */
on: function(event, fn, selector, context) {	
	return localnwt.event.on(this, event, fn, selector,context);
},


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::once
 */
once: function(event, fn, selector, context) {
	return localnwt.event.on(this, event, fn, selector, context, true);
},


/**
 * Implement a node API to for event listeners
 * @see NWTEvent::off
 */
off: function(event, fn) {
	return localnwt.event.off(this, event, fn);
},


/**
 * Purges a node of all listeners
 * @param string If passed, only purges this type of listener
 * @param function If passed, only purges the node of this listener
 * @param bool If true, purges children
 */
purge: function(type, callback, recurse) {
	var evt = localnwt.event;

	for (var i in evt._cached) {
		for(var j=0,numCbs=evt._cached[i].length; j < numCbs; j++) {
			var thisEvt = evt._cached[i][j];
			if (this._node == thisEvt.obj._node && (!type || type == thisEvt.type)) {
				evt.off(thisEvt.obj, thisEvt.type, thisEvt.raw)
			}
		}
	}

	if (recurse) {
		this.all('*').each(function(el){
			el.purge(type, callback, recurse);
		})
	}
},


/**
 * Fires an event on a node
 */
fire: function(event, callback) {	
	var args = Array.prototype.slice.call(arguments, 1);

	localnwt.event._eventData = args;

	var customEvt = document.createEvent("UIEvents");
	customEvt.initEvent(event, true, false);
	this._node.dispatchEvent(customEvt);
},

uuid: function() {
	if (!this._node.id) {
		this._node.id = 'n' + localnwt.uuid()
	}
	return this._node.id
},

/**
 * Returns the computed CSS for a given style(s)
 * @param String|Array List of styles to compute. If multiple styles are passed in, an object map is returned 
 */
computeCss: function(styles) {

	var computedStyles = document.defaultView.getComputedStyle(this._node),
		i,
		eachStyle,
		cssMap = {}

	// String case, just return the correct style
	if (typeof styles == "string") {
		return computedStyles[styles]
	}

	for (i=0; eachStyle = styles[i]; i++) {
		cssMap[eachStyle] = computedStyles[eachStyle]
	}
	return cssMap
},

/**
 * Implement a node API to animate
 * Takes an additional argument, pushState which signals whether or not to push this anim state onto fxStack
 * @see NWTAnimate::anin
 */
anim: function(styles, duration, easing, pushState) {
	if (!pushState) {

		var styleAttrs = [],
			defaultStyles,
			animHistory,
			i

		for (i in styles) {
			styleAttrs.push(i) 
		}
		defaultStyles = this.computeCss(styleAttrs)

		animHistory = {
			from: [defaultStyles, duration, easing, true /* This makes it so we do not push this again */],
			to: [styles, duration, easing]
		}
		
		fxObj[this.uuid()] = animHistory

		this.fire('anim:push', animHistory)
	}

	return localnwt.anim(this, styles, duration, easing);
},

/**
 * Implement a node API to reverse animations
 * This function will return true if we have a reversible animation to run allowing for syntax like:
 * this.popAnim() || this.anim()
 */
popAnim: function() {
	var id = this.uuid()
		, fx = fxObj[id]

	if (!fx) { return false }

	delete fxObj[id]

	this.fire('anim:pop', fx)
	
	return this.anim.apply(this, fx.from)
},

/**
 * Implement a node API for plugins
 * @see localnwt.plugin
 */
plug: function(plugin, config) {	
	config = config || {};
	config.node = this;
	return localnwt.plugin(plugin, config);
}
};


/**
 * NWTNode Class
 * Used for getting elements
 * @constructor
 */
function NWTNode() {
	
}
n.declare('NodeMgr', NWTNode);

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


localnwt.node = new NWTNode();
localnwt.one = localnwt.node.one;