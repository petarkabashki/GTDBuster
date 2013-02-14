define([  'backbone'
],
function(Backbone) {
	var Task = Backbone.Model.extend({
		defaults: {    
		}
		
	});

	var TaskList = Backbone.Collection.extend({
		model: Task,
	});
	
	return {
		Task: Task,
		TaskList: TaskList			
	};
});
