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
			
			var attrs = {
				subject: this.$el.find('.subject').val(),
				duedate: this.$el.find('.duedate').val(),
				estimate: this.$el.find('.estimate').val(),
				description: this.$el.find('.description').val(),
				status: this.$el.find('select.status').val()
			};
			
			this.model.save(attrs, {
				success: function() {
					vent.trigger('list:tasks', status);	
				}
			})
			
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
		  "change .dropdown.status": "triggerChangeStatus",
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
		
		triggerChangeStatus: function(){ 
			vent.trigger("list:tasks", this.getCurrentStatus());
		},
				
		getCurrentStatus: function(){
			return this.$el.find('.dropdown.status option:selected').val();
		},
		
		selectStatus: function(status){
			this.$el.find('.dropdown.status').val(status);
		}
		
	});
		
	return {
		HomeNavbarView: HomeNavbarView,
		TaskItemView: TaskItemView,
		TaskListView: TaskListView,
		TaskEditView: TaskEditView
	};
});
