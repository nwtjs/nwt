/**
 * A node iterator
 * @constructor
 */
function NWTNodeList(nodes) {
	var wrappedNodes = [];

	for( var i = 0, node ; node = nodes[i] ; i++  ) {
		wrappedNodes.push(new NWTNodeInstance(node));
	}  
	this.nodes = wrappedNodes;

	var iteratedFunctions = [
		'remove', 'addClass', 'removeClass'
	],

	mythis = this;

	function getIteratedCallback(method) {
		return function() {
			console.log(method, 'called', mythis.nodes);
			for( var j = 0 , node ; node = mythis.nodes[j] ; j++ ) {
				node[method].apply(node, arguments);
			}
		};		
	};

	for( var i = 0, func; func = iteratedFunctions[i] ; i++ ) {
		this[func] = getIteratedCallback(func);
	}
}


/**
 * Node iterator
 * @param function Callback for each node
 */
NWTNodeList.prototype.each = function(callback) {
	for( var i = 0 , node ; node = this.nodes[i] ; i++ ) {
		callback(node);
	}
};


/**
 * Returns a node specified by an offset
 * @param integer Offset of the item
 */
NWTNodeList.prototype.item = function(offset) {
	return this.nodes[offset];
}


/**
 * Returns the size of the current nodelist
 * @return integer
 */
NWTNodeList.prototype.size = function() {
	return this.nodes.length;
}

nwt.all = nwt.node.all;