var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var cons = require('consolidate');

//////////////////////////
/// Mongoose configuration
var mongoose = require('mongoose/');
var config = require('./config');
db = mongoose.connect(config.creds.mongoose_auth),
Schema = mongoose.Schema;  

// Create a schema for our data
var TaskSchema = new Schema({
  subject: String,
  description: String,
  estimate: Number,
  status: String,
  duedate: Date,
  createdate: Date
});

// Use the schema to register a model with MongoDb
mongoose.model('Task', TaskSchema); 
var Task = mongoose.model('Task'); 

//////////////////////////
/// Express setup

app.set('views', __dirname + '/views');
app.engine('html', cons.underscore);
app.set('view engine', 'underscore');

app.use(express.bodyParser()); 

app.use(express.static(__dirname + '/public')); 

app.get('/', function(req, res, next) {
  res.render('layout.html');
});



app.use(app.router);


process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e);
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

var saveTask = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  var _id = req.body._id;
  delete req.body._id;
  
  Task.findByIdAndUpdate(_id, req.body, {upsert: true}, function (err, t) {
  	if(err){
  		console.log(t);
  		console.log(err);
  	}
  	else{
  		res.send(t);
  	}
  });
}

app.post('/api/tasks', saveTask);
app.put('/api/tasks', saveTask);

app.get('/api/tasks', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  Task.find(function (arr,data) {
    res.send(data);
  });
});

app.listen(9000);




