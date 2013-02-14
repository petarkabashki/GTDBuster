requirejs.config({
    baseUrl : 'js',
    paths : {
        views : 'views',
				backbone : 'lib/backbone',
				"backbone.filtercollection.patch": 'backbone.filtercollection.patch',
				underscore : 'lib/underscore',
				jquery : 'lib/jquery-1.8.3',
				wreqr : 'lib/backbone.wreqr',   
				marionette : 'lib/backbone.marionette',        
				bootstrap : 'lib/bootstrap',
				handlebars: 'lib/handlebars'
    },
		shim : {
		  jquery : {
		    exports : 'jQuery'
		  },
		  underscore : {
		    exports : '_'
		  },
			handlebars : {
			    exports: "Handlebars"
			},
		  backbone : {
		    deps : ['jquery', 'underscore', 'handlebars'],
		    exports : 'Backbone'
		  },
		  bootstrap:{
		  	deps: ['jquery'],
		  	exports: 'Bootstrap'
		  },
		  marionette : {
		    deps : ['jquery', 'underscore', 'backbone', 'wreqr'],
		    exports : 'Marionette'
		  },
		  wreqr: {
		  	deps: ['backbone']
		  }
		}
});

requirejs(['underscore', 'bootstrap', 'vent', 'views', 'model'], function(_, Bootstrap, vent, Views, Model) {

		//alert(1);
		
		Handlebars.registerHelper("ifEq", function(attr, val, context) {
			if (val === attr) {
				return context.fn();
			}
			
		});

    var GTDApp = new Backbone.Marionette.Application({
   	
    	showMainNavbar: function(){
    		var navbarView = new Views.HomeNavbarView({template: "#main-navbar-template"});    	    		
    		GTDApp.navbar.show(navbarView);
    	},
    	
    	listTasks: function(status, task){
    		var filteredTasks = this.allTasks.where({status: status});
    		var collection = new Model.TaskList(filteredTasks);

    		var mainView = new Views.TaskListView({ 
		  			collection: collection
		  	});
    		GTDApp.main.show(mainView);  
    		vent.trigger("navbar:selectstatus", status);
    	},
    	    	
    	editTask: function(task){
    		var editView = new Views.TaskEditView({model: task});
    		GTDApp.main.show(editView);   
    	},
    	
    	newTask: function(status){
    		var task = new Model.Task({status: status});    		
    		
    		var editView = new Views.TaskEditView({model: task});
    		GTDApp.main.show(editView);   
    	},
    	
    	updateTask: function(task){
    		this.listInBasket(task);    		
    	},
    
    	createTask: function(task){
    		this.allTasks.add(task);    		
    	},
    
    	cancelEditTask: function(task){
    		this.listInBasket(task);    		
    	}
    });
    
		GTDApp.addRegions({
      navbar : '#navbar',
      main   : '#content',
      footer : '#footer'
		});
    // Routes
    GTDApp.addInitializer(function(options) {
    	var taskArray = _.map(_.range(20),function(n){return {id: n, "subject": 'inbasket - task ' + n, status: 'in-basket' }; })
  			.concat(_.map(_.range(20),function(n){return {id: n + 20, "subject": 'next action - task ' + n + 20, status: 'next-action'};}))
  			.concat(_.map(_.range(40),function(n){ return { id: n + 40, "subject": 'incubation - task ' + n + 40, status: 'incubation' };}));
  			
  		this.allTasks = new Model.TaskList(taskArray);

      this.showMainNavbar();
      this.listTasks("next-action");
      
      
			//this.listenTo(vent, 'go:back', this.goBack);
			
			this.listenTo(vent, 'list:tasks', this.listTasks);
  		
  		this.listenTo(vent, 'task:edit', this.editTask);
  		
  		this.listenTo(vent, 'task:edit:upate', this.updateTask);
  		
  		this.listenTo(vent, 'task:edit:create', this.createTask);

  		this.listenTo(vent, 'task:edit:cancel', this.cancelEditTask);  		
  		
  		this.listenTo(vent, 'task:edit:new', this.newTask);
    });

    var options = {};
    GTDApp.start(options);
});

