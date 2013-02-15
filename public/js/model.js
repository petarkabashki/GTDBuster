define([  'backbone'
],
function(Backbone) {
	var Task = Backbone.Model.extend({
		defaults: {    
		},
		idAttribute: '_id',
		url: '/api/tasks'		
	});

	var TaskList = Backbone.Collection.extend({
		model: Task,
		url: '/api/tasks'
	});
	
	return {
		Task: Task,
		TaskList: TaskList			
	};
});
