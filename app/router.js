// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views/group/GroupProgressView',
  'views/department/DepartmentProgressView',
  'views/student/StudentProgressView',
  'views/course/CourseProgressView'

  ],
  function($, _, Backbone, FacultiesListView, GroupProgressView, DepartmentProgressView, StudentProgressView, CourseProgressView) {

    var AppRouter = Backbone.Router.extend({
      routes: {

        '': 'homeAction',
        'group': 'groupAction',
        'department':'departmentAction',
        'student':'studentAction',
        'course':'courseAction',
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

      app_router.on('route:departmentAction', function (actions) {
       var departmentProgressView = new CathedraProgressView();
       departmentProgressView.render();
     });

      app_router.on('route:groupAction', function (actions) {

        var groupProgressView = new GroupProgressView();
        groupProgressView.render();
      });

      app_router.on('route:studentAction', function (actions) {

        var studentProgressView = new StudentProgressView();
        studentProgressView.render();
      });

      app_router.on('route:courseAction', function (actions) {

        var courseProgressView = new CourseProgressView();
        courseProgressView.render();
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
