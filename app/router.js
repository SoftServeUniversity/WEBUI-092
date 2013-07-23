// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views//work/WorkTasksView'
], function($, _, Backbone, FacultiesListView, WorkTasksView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
 	  // home
      '': 'homeAction',
      'work': 'workShow',
      

      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
     
    app_router.on('route:homeAction', function (actions) {
     
       // display the home page 
        var facultiesListView = new FacultiesListView();
        facultiesListView.render();
    });   
   
    app_router.on('route:workShow', function (actions){
      var workTasksView = new WorkTasksView();
      workTasksView.render();
    });
    

    
    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var facultiesListView = new FacultiesListView();
        facultiesListView.render();
    });


    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

