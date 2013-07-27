define([
  'jquery',
  'underscore',
  'backbone',
  'views/faculty/FacultiesListView',
  'views/registration/RegistrationView',
  'views/group/GroupProgressView',
  'views/student/StudentProgressView',
  'views/course/CourseProgressView',
  'views/faculty/MainFacultyView',
  'views/department/MainDepartmentView',
  'views/teacher/TeacherProgressView',
  'views/work/WorkView',
  'views/fa/faRolesView',
  'views/fa/faDepartmentsView',
  'views/task/taskView',
  'collections/task/TaskCollection',
  'views/notFoundView',
  'views/fa/DBView'

  ],
  function($, _, Backbone, FacultiesListView, RegistrationView, GroupProgressView, StudentProgressView, CourseProgressView,  MainFacultyView, MainDepartmentView,TeacherProgressView, WorkView, FaRolesView, FaDepartmentsView, taskView, TaskCollection, NotFoundView, DBView) {
    var AppRouter = Backbone.Router.extend({
      routes: {
        ''                       : 'homeAction',
        'group/:id'              : 'groupProgressAction',
        'student/:id'            :'studentProgressAction',
        'course/:id'             :'courseProgressAction',
        'faculty/:id'            :'facultyAction',
        'teacher/:id'            :'teacherProgressAction',
        'department/:id'         :'departmentAction',
        'work/:id'               : 'workShow',
        'fa/menage_roles'        : 'faRoles',
        'fa/menage_departments'  : 'faMenageDepartments',
        'fa/manage_db'           : 'faManageDB',
        'work/:id/:taskid'       : 'taskShow',
      
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
       var registrationView = new RegistrationView();
       registrationView.render();
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

      app_router.on('route:faManageDB', function (actions){
        var dbView = new DBView();
        dbView.render();
      });

    app_router.on('route:taskShow', function (taskid, id) {

        var tasks = new TaskCollection;
        tasks.fetch({async:false});
        var task = tasks.get(id);
        if(!tasks.get(id)){
          var pageNotFound = new NotFoundView();
          pageNotFound.render();
          return;
        }
        var currentTask = new taskView({"model": task});
        currentTask.render();
    });   

      app_router.on('route:defaultAction', function (actions) {
        // We have no matching route, lets display the home page
        var facultiesListView = new FacultiesListView();
        facultiesListView.loadData();
      });
      Backbone.history.start();
    };
    return {
      initialize: initialize
    };
  });

