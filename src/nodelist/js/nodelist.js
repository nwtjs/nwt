/**
 * A node iterator
 * @constructor
 */
function NWTNodeList(nodes) {

	localnwt.implement('DelayableQueue', this);

	var wrappedNodes = [];

	for( var i = 0, node ; node = nodes[i] ; i++  ) {
		wrappedNodes.push(new NWTNodeInstance(node));
	}  
	this.nodes = wrappedNodes;

	var iteratedFunctions = [
		'anim', 'appendTo', 'remove', 'addClass', 'removeClass', 'setStyle', 'setStyles', 'removeStyle', 'removeStyles', 'swapClass', 'plug'
	],

	mythis = this;

	function getIteratedCallback(method) {
		return function() {
			for( var j = 0 , node ; node = mythis.nodes[j] ; j++ ) {
				node[method].apply(node, arguments);
			}
			return mythis;
		};		
	};

	for( var i = 0, func; func = iteratedFunctions[i] ; i++ ) {
		this[func] = getIteratedCallback(func);
	}
}
n.declare('NodeList', NWTNodeList);

NWTNodeList.prototype = {
/**
 * Node iterator
 * @param function Callback for each node
 */
each: function(callback) {
	for( var i = 0 , node ; node = this.nodes[i] ; i++ ) {
		callback(node);
	}
},


/**
 * Returns a node specified by an offset
 * @param integer Offset of the item
 */
item: function(offset) {
	return this.nodes[offset];
},


/**
 * Returns the size of the current nodelist
 * @return integer
 */
size: function() {
	return this.nodes.length;
}
};

localnwt.all = localnwt.node.all;
