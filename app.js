
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// Database
var mongo = require('mongoskin');
var db = mongo.db([
    'localhost:27017/?auto_reconnect'
    ], {
        database: 'nodetest2',
        safe: true
    }
);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//Routes
app.get('/', routes.index);
app.get('/userlist', user.userlist(db));
app.post('/adduser', user.adduser(db));
app.post('/updateuser/:id', user.updateuser(db));
app.delete('/deleteuser/:id', user.deleteuser(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});