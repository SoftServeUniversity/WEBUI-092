// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'views/HelloView',
  'views/fa/FaRolesView',
  'views/faculty/FacultiesListView',
], function($, _, Backbone, LocalStorage, HelloView, FaRolesView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
 	    // home
      '': 'homeAction',
      //roles
      'fa_roles': 'faRoles',


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
   
    app_router.on('route:faRoles', function (actions){
      var faRolesView = new FaRolesView();
      faRolesView.render();
      console.log('We have trigered the fa_role route');
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
