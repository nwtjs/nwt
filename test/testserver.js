var express = require("express"),
	app = express.createServer();

app.set('views', __dirname + '/views');

app.set('view options', {
  layout: false
});

app.use(express.static(__dirname + '/../src'));

app.get('/test', function(req, res){
	res.render('test.ejs');
});

function getSimpleJson(req, res) {
	res.end('{result: 1}');
}

app.get('/simplejson', getSimpleJson);
app.post('/simplejson', getSimpleJson);
app.put('/simplejson', getSimpleJson);
app.del('/simplejson', getSimpleJson);


app.listen(3000);
console.log('Server started on port 3000');