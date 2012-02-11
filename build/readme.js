/**
 * This file generates the README documentation
 * from code comments
 */

var fs = require('fs'),

dox = require("dox")

packages = require("./package"),

scriptContent = [];

for( var i in packages.main ) {

	for( var j = 0, file; file = packages.main[j] ; j++ ) {
		console.log('Reading file file:', file);
		scriptContent.push(fs.readFileSync(__dirname + '/../src/' + file, 'utf8'));
	}
}

// Generate markdown
var parsedObj = dox.parseComments(scriptContent.join('')),
	readmeContent = [],
	numDefines = parsedObj.length,
	i;



readmeContent = ["<h2>NWTui</h2>\n\nNWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.\n\n"];



for (i = 0; i < numDefines; i += 1) {

	var define = parsedObj[i],
		currClass = "";

	// Skip private functions (functions with underscores at the start)
	if (define.ctx.name.indexOf('_') === 0 || define.isPrivate || define.ignore) { continue; }


	var headerMd = '###';

	// First handle tag content
	var numTags = define.tags.length,
		tagContent = [];
	if (numTags > 0) {
		tagContent.push("\n\n");

		for (var j = 0; j < numTags; j += 1) {
			var tag = define.tags[j];

			// Special header for constructors
			if( tag.type == 'constructor' ) {
				headerMd = '##';
				currClass = define.ctx.name;
			}

			tagContent.push('@' + tag.type);

			if( tag.types ) tagContent.push(' (' + tag.types + ')');

			tagContent.push(' - ');

			if( tag.name ) readmeContent.push(tag.name);
			if( tag.description ) readmeContent.push(tag.description);

			tagContent.push("\n");
		}
	}
	tagContent = tagContent.join('');



	readmeContent.push(headerMd + ' ');

	if( currClass ) readmeContent.push(currClass + '::');

	readmeContent.push(define.ctx.name);
	readmeContent.push("\n");
	readmeContent.push(define.description.full);

	readmeContent.push(tagContent);

	readmeContent.push("\n\n\n");
}
console.log(readmeContent);

fs.writeFileSync(__dirname + '/../README.md', readmeContent.join(''));