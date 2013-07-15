// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views/department/MainDepartmentsView'
], function($, _, Backbone, FacultiesListView, DepartmentsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
 	  // home
      '': 'homeAction',

      'departments':'departmentsAction',
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
     
    app_router.on('route:homeAction', function (actions) {
     
       // display the home page
        $('#content').empty();
        var facultiesListView = new FacultiesListView();
        facultiesListView.render();
    });

    app_router.on('route:departmentsAction', function (actions) {

        var departmentsView = new DepartmentsView();
        departmentsView.render();
    });
   
    

    
    app_router.on('route:defaultAction', function (actions) {
        $('#content').empty();

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
