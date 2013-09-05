define([
  'jquery',
  'underscore',
  'backbone',
  'marionettes/user/init',
  'views/faculty/FacultiesListView',
  'views/registration/RegistrationView',
  'views/group/GroupProgressView',
  'views/student/StudentProgressView',
  'views/course/CourseProgressView',
  'views/faculty/MainFacultyView',
  'views/department/MainDepartmentView',
  'views/work/MainWorkView',
  'views/task/taskView',
  'collections/tasks/TasksCollection',
  'views/notFoundView',
  'views/admin/adminFacultyView',
  'views/admin/adminView',
  'views/teacher/MainTeacherView',
  'views/teacher/TeacherGroupView',
  'views/user/signUpView',
  'views/info/infoView',
  'views/breadcrumbs/BreadcrumbsView',
  'views/search/SearchView'



  ], function($, _, Backbone, GlobalUser, FacultiesListView, RegistrationView, GroupProgressView,
  	          StudentProgressView, CourseProgressView,  MainFacultyView, MainDepartmentView,
  	          MainWorkView, TaskView, TasksCollection, NotFoundView,
              AdminFacultyView, AdminView, MainTeacherView, TeacherGroupView, UserSingUpView,
              InfoView, BreadcrumbsView, SearchView

             ) {


    GlobalEventBus = _.extend({}, Backbone.Events);


    var AppRouter = Backbone.Router.extend({
      initialize: function(){
        var searchView = new SearchView();
        var registrationView = new RegistrationView();
        registrationView.render();
      },
      routes: {
        ''                       : 'homeAction',
        'group/:id'              : 'groupProgressAction',
        'student/:id'            : 'studentProgressAction',
        'course/:id'             : 'courseProgressAction',
        'faculty/:id'            : 'facultyAction',
        'teacher/:id'            : 'teacherAction',
        'teacher/:id/group'      : 'teacherGroupAction',
        'department/:id'         : 'departmentAction',
        'work/:id'               : 'workShowAction',
        'fa'                     : 'viewAdminFacultyPage',
        'admin'                  : 'viewAdminPage',
        'task/:id'               : 'taskShow',
        'sign_up'                : 'userSingUp',
        'edit_profile'           : 'editProfile',
        'cancel_account'         : 'cancelAccount',
        'info'                   : 'infoAction',
        // Default
        '*actions': 'defaultAction'
      }
    });
    var initialize = function(){

      var app_router = new AppRouter;

      app_router.on('route:homeAction', function (actions) {
       // display the home page
       var facultiesListView = new FacultiesListView();
       var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:workShowAction', function (id){
<<<<<<< HEAD
=======
        if(this.workView){
          this.workView.$el.undelegate();
        }
        this.workView = new MainWorkView({"id": id});
        var registrationView = new RegistrationView();
        registrationView.render();
>>>>>>> ab6f2c5f96a26ccbb6acbf8b20bc813618d3730d
        var breadcrumbsView = new BreadcrumbsView();
        this.workView = new MainWorkView({"id": id});
      });

      app_router.on('route:viewAdminFacultyPage', function (){
        var adminFacultyView = new AdminFacultyView();
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:viewAdminPage', function (){
        var adminView = new AdminView();
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:groupProgressAction', function (actions) {

        var groupProgressView = new GroupProgressView();
        groupProgressView.render();
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:studentProgressAction', function (id) {

        var studentProgressView = new StudentProgressView();
        studentProgressView.initialize();
        studentProgressView.loadData(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

       app_router.on('route:courseProgressAction', function (actions) {

        var courseProgressView = new CourseProgressView();
        courseProgressView.render();
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:facultyAction', function (id) {
        var mainFacultyView = new MainFacultyView();
        mainFacultyView.initialize();
        mainFacultyView.loadData(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:departmentAction', function (id) {
        var mainDepartmentView = new MainDepartmentView();
        mainDepartmentView.initialize();
        mainDepartmentView.loadData(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:teacherAction', function (id) {
        var mainTeacherView = new MainTeacherView(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:teacherGroupAction', function (id) {
        var teacherGroupView = new TeacherGroupView(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:userSingUp', function(){
        var userSignUp = new UserSingUpView();
        var breadcrumbsView = new BreadcrumbsView();
        userSignUp.render();
      });

      app_router.on('route:editProfile', function (){
        var userSignUp = new UserSingUpView();
        var breadcrumbsView = new BreadcrumbsView();
        userSignUp.edit();
      });

      app_router.on('route:cancelAccount', function (){
        var userSignUp = new UserSingUpView();
        var breadcrumbsView = new BreadcrumbsView();
        userSignUp.cancel();
      });

      app_router.on('route:infoAction', function(){
        var userSignUp = new UserSingUpView();
        var infoView = new InfoView();
        var breadcrumbsView = new BreadcrumbsView();
      });


      app_router.on('route:taskShow', function (id) {
<<<<<<< HEAD
        var breadcrumbsView = new BreadcrumbsView();

          /*var tasks = new TasksCollection;
          tasks.fetch({async:false});
          var task = tasks.get(id);
          if(!tasks.get(id)){
            var pageNotFound = new NotFoundView();
            pageNotFound.render();
            return;
<<<<<<< HEAD
          }*/
          var currentTask = new TaskView({"id": id});
=======
          if(this.currentTask){
            this.currentTask.$el.undelegate();
          }
          this.currentTask = new TaskView({"id": id});
          var breadcrumbsView = new BreadcrumbsView();
          var registrationView = new RegistrationView();
        registrationView.render();
>>>>>>> ab6f2c5f96a26ccbb6acbf8b20bc813618d3730d
      });

      app_router.on('route:defaultAction', function (actions) {
        var breadcrumbsView = new BreadcrumbsView();
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