var express = require("express"),
	app = express.createServer();

app.set('views', __dirname + '/views');

app.set('view options', {
  layout: false
});

app.use(express.static(__dirname + '/../src'));
app.use(express.static(__dirname + '/../'));

app.get('/test', function(req, res){
	res.render('test.ejs');
});

function getSimpleJson(req, res) {
	res.end('{"result": 1}');
}

app.get('/simplejson', getSimpleJson);
app.post('/simplejson', getSimpleJson);
app.put('/simplejson', getSimpleJson);
app.del('/simplejson', getSimpleJson);

app.get('/testheader', function(req, res) {res.end('{"header": "get"}');});
app.post('/testheader', function(req, res) {res.end('{"header": "post"}');});
app.put('/testheader', function(req, res) {res.end('{"header": "put"}');});
app.del('/testheader', function(req, res) {res.end('{"header": "delete"}');});


app.listen(3000);
console.log('Server started on port 3000');