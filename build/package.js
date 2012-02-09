/**
 * Packages all of the NWTui scripts together.
 */

var fs = require('fs'),

packages = {
	main: [
		'base/js/base.js',
		'node/js/node.js',
		'nodelist/js/nodelist.js'
	]
},

scriptContent,

uglify = require(__dirname + "/UglifyJS/uglify-js");

for( var i in packages ) {

	scriptContent = [];

	for( var j = 0, file; file = packages[i][j] ; j++ ) {
		console.log('got file', file);
		scriptContent.push(fs.readFileSync(__dirname + '/../src/' + file, 'utf8'));
	}

	// Wrap every file in an anonymous function
	scriptContent = '(function(){' + scriptContent.join('') + '}());';

	// Finished a package
	var minified = uglify(scriptContent, {mangle_options: {toplevel: true}});
	fs.writeFileSync(__dirname + '/../nwt.' + i + '.min.js', minified);
	
	console.log(minified);
}