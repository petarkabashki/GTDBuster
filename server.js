var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var cons = require('consolidate');
var uuid = require('node-uuid');
//////////////////////////
/// Mongoose configuration

/*
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

//the real mongo storage
var Task = mongoose.model('Task'); 
*/

// Task model stub
var Task = {
	data:[
		{
		  "__v": 0,
		  "_id": "511ea2119d111bff180000a8",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 002"
		},
		{
		  "__v": 0,
		  "_id": "511ea2119d111bff18000008",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "in-basket",
		  "subject": "in-basket task 006"
		},
		{
		  "__v": 0,
		  "_id": "511ea2359d111bff18000009",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "in-basket",
		  "subject": "in-basket task 007"
		},
		{
		  "__v": 0,
		  "_id": "511ea3794ad60bec19000001",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "in-basket",
		  "subject": "in-basket task 008"
		},
		{
		  "status": "next-action",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "next-action task 001",
		  "_id": "511ea37f4ad60bec19000002",
		  "__v": 0
		},
		{
		  "status": "next-action",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "next-action task 002",
		  "_id": "511ea3a94ad60bec19000003",
		  "__v": 0
		},
		{
		  "status": "next-action",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "next-action task 003",
		  "_id": "511ea3f14ad60bec19000004",
		  "__v": 0
		},
		{
		  "status": "inclubation",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "task 001",
		  "_id": "511ea42a4ad60bec19000005",
		  "__v": 0
		},
		{
		  "status": "inclubation",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "task 001",
		  "_id": "511ea4424ad60bec19000006",
		  "__v": 0
		},
		{
		  "__v": 0,
		  "_id": "511ea4704ad60bec19000007",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 003"
		},
		{
		  "status": "next-action",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "next-action task 004",
		  "_id": "511ea4814ad60bec19000008",
		  "__v": 0
		},
		{
		  "status": "next-action",
		  "estimate": null,
		  "duedate": null,
		  "description": "",
		  "subject": "next-action task 005",
		  "_id": "511ea48f4ad60bec19000009",
		  "__v": 0
		},
		{
		  "__v": 0,
		  "_id": "511ea4f34ad60bec1900000a",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 004"
		},
		{
		  "__v": 0,
		  "_id": "511ea4fc4ad60bec1900000b",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 005"
		},
		{
		  "__v": 0,
		  "_id": "511ea51451fb421a1a000001",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 006"
		},
		{
		  "__v": 0,
		  "_id": "511ea7d554f6a5cd1a000001",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 001"
		},
		{
		  "__v": 0,
		  "_id": "511ea7e354f6a5cd1a000002",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 007"
		},
		{
		  "__v": 0,
		  "_id": "511ea7fc54f6a5cd1a000003",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "incubation",
		  "subject": "incubation task 008"
		},
		{
		  "__v": 0,
		  "_id": "511e9fc19d111bff18000001",
		  "description": "",
		  "duedate": null,
		  "estimate": null,
		  "status": "next-action",
		  "subject": "next-action task 006"
		},
		{
		  "_id": "511e9fc19d111bff1800c001",
		  "description": "",
		  "duedate": "2013-02-15T00:00:00.000Z",
		  "estimate": null,
		  "status": "in-basket",
		  "subject": "another task"
		}
	],
	
	find: function(fn){
		fn(null, Task.data);
	},
	
	findByIdAndUpdate: function(_id, data, options, fn)
	{
		if(! _id) 
		{
			data._id = uuid.v4();
			Task.data.push(data);
			fn(null, data);			
		}
		else
		{
			var t = _.findWhere(Task.data, {"_id": _id});
			if(t) _.extend(t, data);
			fn(null, t);
		}
	}
	
};

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
  Task.find(function (err,data) {
    res.send(data);
  });
});

app.listen(9000);




