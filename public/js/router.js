define([
  "vent"
],
function(Vent) {
	var Router = Backbone.Marionette.AppRouter.extend({
		// "someMethod" must exist at controller.someMethod
	/*  appRoutes: {
		  "some/route": "someMethod"
		}
	*/
		/* standard routes can be mixed with appRoutes/Controllers above */
		routes : {
		  "/inbasket" : "inbasket"
		},
		
		inbasket : function(){
		  // do something here.
		  console.log('inbasket');
		}

	});
	return Router;
});
