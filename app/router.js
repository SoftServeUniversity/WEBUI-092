define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views/group/GroupProgressView',
  'views/student/StudentProgressView',
  'views/course/CourseProgressView',
  'views/department/MainFacultyView',
  'views/department/MainDepartmentView',
  'views/teacher/TeacherProgressView',
  'views/work/WorkView',
  'views/fa/faRolesView',
  'views/fa/faDepartmentsView'
  ],
  function($, _, Backbone, FacultiesListView, GroupProgressView, StudentProgressView, CourseProgressView,  MainFacultyView, MainDepartmentView,TeacherProgressView, WorkView, FaRolesView, FaDepartmentsView) {
    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'homeAction',
        'group/:id': 'groupProgressAction',
        'student/:id':'studentProgressAction',
        'course/:id':'courseProgressAction',
        'faculty/:id':'facultyAction',
        'teacher/:id':'teacherProgressAction',
        'department/:id':'departmentAction',
        'work/:id': 'workShow',
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
       facultiesListView.loadData();
      });

       app_router.on('route:workShow', function (actions){
        var workView = new WorkView();
        workView.render();
      });



      app_router.on('route:groupProgressAction', function (actions) {

        var groupProgressView = new GroupProgressView();
        groupProgressView.render();
      });

      app_router.on('route:studentProgressAction', function (actions) {

        var studentProgressView = new StudentProgressView();
        studentProgressView.render();
      });

       app_router.on('route:courseProgressAction', function (actions) {

        var courseProgressView = new CourseProgressView();
        courseProgressView.render();
      });

      app_router.on('route:facultyAction', function (id) {
        var mainFacultyView = new MainFacultyView();
        mainFacultyView.initialize();
        mainFacultyView.loadData(id);
      });

      app_router.on('route:departmentAction', function (id) {

        var mainDepartmentView = new MainDepartmentView();
        mainDepartmentView.initialize();
        mainDepartmentView.loadData(id);
      });

      app_router.on('route:teacherProgressAction', function (actions) {
        var teacherProgressView = new TeacherProgressView();
        teacherProgressView.render();
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

