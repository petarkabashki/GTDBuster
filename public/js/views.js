define([
  "vent", "jquery", "handlebars"
],
function(vent, $, Handlebars) {
	var TaskItemView = Backbone.Marionette.ItemView.extend({
		template: Handlebars.compile($("#in-basket-item-template").html()),
		tagName: 'tr',
		triggers: {
		  "click .item": "task:edit"
		},
		
		initialize: function(){			
		}
		
	});

	var TaskListView = Backbone.Marionette.CollectionView.extend({
		itemView: TaskItemView,
		tagName: 'table',
		className: 'issue-list unstyled table table-striped table-hove',
		
		initialize: function(){
			this.on('itemview:task:edit', function(itemview){
		  	vent.trigger("task:edit", itemview.model);
			});
		},		
				
		scrollToModel: function(model){		  
      $('html, body').animate({
      		scrollTop: this.children.findByModel(model).$el.offset().top - 50
       	}, 300);
		}
				
	});
			
	var TaskEditView = Backbone.Marionette.ItemView.extend({
		template: Handlebars.compile($("#task-edit-template").html()),
		events: {
			"click .save" : 'save',
			"click .back" : 'back'
		},
		
		save: function(){
			var status = this.model.get('status') || 'next-action' ;
			this.model.set('subject', this.$el.find('.subject').val());
			this.model.set('duedate', this.$el.find('.duedate').val());
			this.model.set('estimate', this.$el.find('.estimate').val());
			this.model.set('description', this.$el.find('.description').val());
			this.model.set('status', this.$el.find('select.status').val());
			
			if(! this.model.get('id')) vent.trigger('task:edit:create', this.model);
			
			vent.trigger('list:tasks', status);
			return false;
		},
		
		back: function(){		
			var status = this.model.get('status') || 'next-action' ;
			vent.trigger('list:tasks', status);
			return false;
		}
	});
	
	////////////////////////////////////
	var statusMenuMap = {
				"in-basket": "In Basket",
				"next-action": "Next Action",
				"incubation": "Incubation"
				
			};
			
	var HomeNavbarView = Backbone.Marionette.ItemView.extend({
		className: "navbar-inner",
		events: {
		  "click .in-basket": "triggerListInbasket",
		  "click .next-action": "triggerNextAction",
		  "click .incubation": "triggerIncubation",
		  "click .btn.new": "triggerNew"
		},
		initialize: function(){			
			this.listenTo(vent, 'navbar:selectstatus',function(status){ 
					this.selectStatus(status); 
				
				});
		},
		
		
		triggerNew: function(){ 
			vent.trigger("task:edit:new", "in-basket");
		},
		
		triggerListInbasket: function(){ 
			vent.trigger("list:tasks", "in-basket");
		},
		
		triggerNextAction: function(){ 
			vent.trigger("list:tasks", "next-action");
		},
		
		triggerIncubation: function(){ 
			vent.trigger("list:tasks", "incubation");
		},
		
		getCurrentStatus: function(){
			return this.$el.find('.dropdown.status .lbl').attr('data-status');
		},
		
		selectStatus: function(status){
			this.$el.find('.dropdown.status ul li').removeClass("active");			
			this.$el.find('.dropdown.status ul li.' + status).addClass("active");
			this.$el.find('.dropdown.status .lbl').html(statusMenuMap[status]);
			this.$el.find('.dropdown.status .lbl').attr('data-status', status);
		}
		
	});
		
	return {
		HomeNavbarView: HomeNavbarView,
		TaskItemView: TaskItemView,
		TaskListView: TaskListView,
		TaskEditView: TaskEditView
	};
});
