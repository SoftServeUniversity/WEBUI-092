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
  'views/work/MainWorkView',
  'views/task/taskView',
  'collections/tasks/TasksCollection',
  'views/notFoundView',
  'views/admin/adminFacultyView',
  'views/admin/adminView',


  ], function($, _, Backbone, FacultiesListView, RegistrationView, GroupProgressView,
  	          StudentProgressView, CourseProgressView,  MainFacultyView, MainDepartmentView,
  	          TeacherProgressView, MainWorkView, TaskView, TasksCollection, NotFoundView,
              AdminFacultyView, AdminView
             ) {


  	
  	GlobalEventBus = _.extend({}, Backbone.Events);

  	

    var AppRouter = Backbone.Router.extend({
      routes: {
        ''                       : 'homeAction',
        'group/:id'              : 'groupProgressAction',
        'student/:id'            : 'studentProgressAction',
        'course/:id'             : 'courseProgressAction',
        'faculty/:id'            : 'facultyAction',
        'teacher/:id'            : 'teacherProgressAction',
        'department/:id'         : 'departmentAction',
        'work/:id'               : 'workShowAction',
        'fa'                     : 'viewAdminFacultyPage',
        'admin'                  : 'viewAdminPage',
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
       var registrationView = new RegistrationView();
       registrationView.render();
      });

      app_router.on('route:workShowAction', function (id){
        var workView = new MainWorkView(id);
      });

      app_router.on('route:viewAdminFacultyPage', function (){
        var adminFacultyView = new AdminFacultyView();
      });

      app_router.on('route:viewAdminPage', function (){
        var adminView = new AdminView();
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

      /*app_router.on('route:faRoles', function (actions){
        var faRolesView = new FaRolesView();
        faRolesView.render();
      });

      app_router.on('route:faMenageDepartments', function (actions){
        var faDepartmentsView = new FaDepartmentsView();
      });

      app_router.on('route:faManageDB', function (actions){
        var dbView = new DBView();
        dbView.render();
      });

      app_router.on('route:faManageCourses', function (actions){
        var CoursesView = new faCoursesListView();
        CoursesView.render();
      });*/
 
      app_router.on('route:taskShow', function (taskid, id) {

          var tasks = new TasksCollection;
          tasks.fetch({async:false});
          var task = tasks.get(id);
          if(!tasks.get(id)){
            var pageNotFound = new NotFoundView();
            pageNotFound.render();
            return;
          }
          var currentTask = new TaskView({"model": task});
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

