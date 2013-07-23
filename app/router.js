// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'views/HelloView',
  'views/fa/FaRolesView',
  'views/faculty/FacultiesListView',
  'views/fa/FaDepartmentsView',
], function($, _, Backbone, LocalStorage, HelloView, FaRolesView, FacultiesListView, FaDepartmentsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
 	    // home
      '': 'homeAction',

      'fa/menage_roles': 'faRoles',
      'fa/menage_departments' : 'faMenageDepartments',


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
    });

    app_router.on('route:faMenageDepartments', function (actions){
      var faDepartmentsView = new FaDepartmentsView();
      faDepartmentsView.render();
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
