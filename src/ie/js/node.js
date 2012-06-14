var ieVersion = parseFloat(navigator.appVersion.split("MSIE")[1]);

var oListeners = {};
function runListeners(oEvent) {
	if (!oEvent) { oEvent = window.event; }
	for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {

		if (oEvtListeners.aEls[iElId] === this) {

			// Normalize the target and methods
			oEvent.target = oEvent.srcElement;
			oEvent.stopPropagation = function() {
				window.event.cancelBubble = true;
			}
			oEvent.preventDefault = function() {
				event.returnValue = false;
			}

			for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
				oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
			}
			break;
		}
	}
}
var addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
	if (oListeners.hasOwnProperty(sEventType)) {

		var oEvtListeners = oListeners[sEventType];
		for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
			if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
		}

		if (nElIdx === -1) {
			oEvtListeners.aEls.push(this);
			oEvtListeners.aEvts.push([fListener]);
			this["on" + sEventType] = runListeners;
		} else {
			var aElListeners = oEvtListeners.aEvts[nElIdx];
			if (this["on" + sEventType] !== runListeners) {
				aElListeners.splice(0);
				this["on" + sEventType] = runListeners;
			}
			for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
				if (aElListeners[iLstId] === fListener) { return; }
			}
			aElListeners.push(fListener);
		}
	} else {
		oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
		this["on" + sEventType] = runListeners;
	}
};
var removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {

	if (!oListeners.hasOwnProperty(sEventType)) { return; }

	var oEvtListeners = oListeners[sEventType];
	for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
		if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
	}

	if (nElIdx === -1) { return; }
	for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
		if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
	}
};

try {
	Element.prototype.addEventListener = addEventListener
	Element.prototype.removeEventListener = removeEventListener		
}catch(e){
}

/**
 * Resolves JS Styles
 */
nwt.augment('Node', '_jsStyle', function (name) {
	var lookupMap = {float: 'styleFloat'};

	if (lookupMap[name]) name = lookupMap[name];
	return name;
});



/**
 * Simulates a click event on a node
 */
nwt.augment('Node', 'click', function () {
	var evt = document.createEventObject();
	return !this._node.fireOnThis.fireEvent( 'onclick', evt );
});

/**
 * Fires an event on a node
 */
nwt.augment('Node', 'fire', function (event, callback) {
	var testEvt = {
		srcElement : this._node,
		type : event	
	}

	runListeners.call(this._node, testEvt)
})

if (ieVersion <= 8) {
	nwt.augment('Node', 'addEventListener', function(ev, fn) {
		addEventListener.call(this._node, ev, fn)
		return this
	})

	nwt.augment('Node', 'removeEventListener', function(ev, fn) {
		removeEventListener.call(this._node, ev, fn)
		return this
	})

	nwt.augment('Node', 'hasAttribute', function(prop) {
		if (this._node.getAttribute(prop)) {
			return true
		}
		return false
	})
}

if (!document.querySelectorAll) {
	nwt.augment('Node', 'one', function(selector) {
		var node = Sizzle(selector, ' ' , this._node);
		return new nwt._lib.Node(node);
	})

	nwt.augment('Node', 'all', function(selector) {
		var nodelist = Sizzle(selector, this._node);
		return new nwt._lib.NodeList(nodelist);
	})

	nwt.node.one = nwt.one = function(selector) {
		if( typeof selector == 'string' ) {
			var node = Sizzle(selector);

			if( node.length == 0 ) {
				return null;
			}

			return new nwt._lib.Node(node[0]);
		} else {
			return new nwt._lib.Node(selector);
		}
	}

	nwt.node.all = nwt.all = function(selector) {
		var nodelist = Sizzle(selector);
		return new nwt._lib.NodeList(nodelist);
	}
}
