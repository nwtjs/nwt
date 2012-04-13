// Map of all registered plugsin to definitions
var pluginMap = {};


/**
 * Registers a plugin
 * @param object Definition of the plugin
 */
localnwt.register = function(definition) {
	pluginMap[definition.name] = definition;
};

/**
 * Instantiates a plugin
 */
localnwt.plugin = function(plugin) {
	var params = Array.prototype.slice.call(arguments),

		i,

		name = params.shift(),

		def = pluginMap[plugin];

	var tempHolder = function(){},
		myPluginClass;

	wrapPluginCall = function (method) {

		var _super;
		if (def.extend) {
			_super = function() {
				pluginMap[def.extend].methods[method].apply(this, arguments);
			};
		}

		return function() {
			this._super = _super;
			return def.methods[method].apply(this, arguments);
		}
	};

	// Wrap each method call so we can expose the super variable to it
	if (def.methods) {
		for (i in def.methods) {
			tempHolder.prototype[i] = wrapPluginCall(i);
		}
	}

	// Init plugins on dom ready
	localnwt.ready(function(){
		myPluginClass = new tempHolder();
		myPluginClass.init.apply(myPluginClass, params);
	});
};