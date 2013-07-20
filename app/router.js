// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views/department/MainFacultyView',
  'views/department/MainDepartmentView'
], function($, _, Backbone, FacultiesListView, FacultyView, DepartmentView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
 	  // home
      '': 'homeAction',

      'departments':'departmentsAction',
      'teachers':'teachersAction',
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

        var facultyView = new FacultyView();
        facultyView.render();
    });
    app_router.on('route:teachersAction', function (actions) {

        var departmentView = new DepartmentView();
        departmentView.render();
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
