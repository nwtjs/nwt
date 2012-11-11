/**
 * Packages all of the NWTui scripts together.
 */

var fs = require('fs'),

packages = require("./package"),

scriptContent,

uglify = require("uglify-js");

for( var i in packages ) {

	scriptContent = [];

	for( var j = 0, file; file = packages[i][j] ; j++ ) {
		console.log('Compressing file file:', file);
		var thisScript = fs.readFileSync(__dirname + '/../src/' + file, 'utf8') + "\n";
		scriptContent.push(thisScript);

		// Uncomment to see what's breaking the build
		//uglify(thisScript, {mangle_options: {toplevel: true}});
		
	}
	
	// Wrap every file in an anonymous function
	// Uglify-js is not rewriting my window/document names for some reason, so just do it manually for now
	scriptContent = scriptContent.join('')
	scriptContent = scriptContent.replace(/window/g, 'z');
	scriptContent = scriptContent.replace(/document(?!Element)/g, 'y');
	scriptContent = "!function(z,y){\n" + scriptContent + '\n}(window, document)';

	// Write the non-minified package
	fs.writeFileSync(__dirname + '/../' + i + '.js', scriptContent);

	// Write the minified package
	scriptContent = uglify(scriptContent, {mangle_options: {toplevel: true}});
	fs.writeFileSync(__dirname + '/../' + i + '.min.js', scriptContent);

	console.log(scriptContent);
}