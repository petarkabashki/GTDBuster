define([  
],
function() {
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
