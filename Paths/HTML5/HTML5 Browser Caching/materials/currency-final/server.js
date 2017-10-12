
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get('/', function(req, res) {
  res.contentType('text/html');
  res.sendfile(__dirname + '/views/index.erb');
});

app.get('/offline.appcache', function(req, res){
  res.contentType('text/cache-manifest')
  res.sendfile(__dirname + '/views/offline.appcache.erb');
});

app.post('/exchange', function(req, res) {
  res.contentType('application/json');
  res.json({
    "HKD": 0.1284,
    "EUR": 1.416,
    "AUD": 1.0739,
    "JPY": 0.0126,
    "GBP": 1.6146
  });
});

var server = http.createServer(app);
server.listen(9292);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
