define([
  'jquery',
  'underscore',
  'backbone',
  'marionettes/user/init',
  'reg',
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



  ], function($, _, Backbone, GlobalUser, reg, FacultiesListView, RegistrationView, GroupProgressView,
              StudentProgressView, CourseProgressView,  MainFacultyView, MainDepartmentView,
              MainWorkView, TaskView, TasksCollection, NotFoundView,
              AdminFacultyView, AdminView, MainTeacherView, TeacherGroupView, UserSingUpView,
              InfoView, BreadcrumbsView, SearchView

             ) {



    GlobalEventBus = _.extend({}, Backbone.Events);

    // Extend Backbone.Collection for fetch data
    // fron any collection with filter

    Backbone.Collection.prototype.FetchCollection = function(filterData) {

      // Set filterData = {} if filterData is undefined
      filterData = typeof filterData !== 'undefined' ? filterData : {};

      // Create filter from filterData for fetch collection
      var filterForCollection = {};
      for(item in filterData) {
        var filter = {};
        filter[item] = filterData[item];
        filterForCollection.filter = filter;
      }
      // Fetch collection with filter
      this.fetch({
        data: filterForCollection,
        async: false, //for wait, when load data
        success: function(model, response) {
          return model;
        },
        error: function(model, response) {
          console.log('Fetch collection error');
        }
      });
    };

    var AppRouter = Backbone.Router.extend({

      initialize: function(){

        this.history = [];
        //update menu when needed
        this.bind( "all", this.updateMenu )

        //store history, so it's possible to navigate back
        this.bind( "all", this.storeRoute )

        var registrationView = new RegistrationView();
        registrationView.render();
        $('.brand').click(function() {
            location.href = '/#';
            location.reload();
        });
      },

      //restore history to previous state
      //(WITHOUT triggering router) in case
      //of unsuccessful attempt to get to some url
      storeRoute: function(){
        this.history.push(Backbone.history.fragment)
      },
      previousRoute: function(){
        if (this.history.length > 1) {
          this.navigate(this.history[this.history.length-1], false)
        }
      },

      //add active class to menu items
      updateMenu: function(){
        var link;

        $(".page-link").removeClass('active');

        var path = Backbone.history.fragment;

        var allPaths = ['info', 'search', 'admin', 'fa', 'teacher', 'student'];

        for (var i = 0; i < allPaths.length; i++){
          // If in main page
          // (blank string contains in all paths)
          if (path == false) {
            link = '#page-link_id';
            $(link).addClass('active');
            break;
          //if in other paths
          } else if (path.contains(allPaths[i])){
            link = '#' + allPaths[i] + 'page-link_id';
            $(link).addClass('active');
            break;
          }
        }

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
        'search'                 : 'searchAction',
        // Default
        '*actions': 'defaultAction'
      }

    });

    var initialize = function(){

      // this function is defined in libs/reg
      GlobalUser.userRoleCheck({ redirect: false });

      GlobalUser.vent.on("authentication:logged_out", function(){
        GlobalUser.hideUserHomeButton();
        GlobalUser.currentUser = null;
        $('#launch-btn').show();
        window.location.hash = '/'
      });
      GlobalUser.vent.on("authentication:logged_in", function(){
        GlobalUser.userRoleCheck({ redirect: true });
        console.log("authentication:logged_in")
      })
      GlobalUser.vent.on("role_loaded", function(){
        GlobalUser.userRoleCheck({ redirect: true });
        console.log("role_loaded")
      });


      app_router = new AppRouter;

      app_router.on('route:homeAction', function (actions) {
       // display the home page
        var facultiesListView = new FacultiesListView();
        var breadcrumbsView = new BreadcrumbsView();

        $("#main-page-link").addClass('active');

      });


      app_router.on('route:viewAdminFacultyPage', function (){

        var checkInfo = GlobalUser.checkRole('faculty_admin');

        if(checkInfo.status == true && checkInfo.verified){
          var adminFacultyView = new AdminFacultyView();
          var breadcrumbsView = new BreadcrumbsView();
        } else {
          //defined in libs/reg
          GlobalUser.showWarning(checkInfo.text);
        }
      });

      app_router.on('route:viewAdminPage', function (){

        var checkInfo = GlobalUser.checkRole('admin');

        if(checkInfo.status == true){
          var adminView = new AdminView();
          var breadcrumbsView = new BreadcrumbsView();
        } else {
          //defined in libs/reg
          GlobalUser.showWarning(checkInfo.text);
        }

      });


      app_router.on('route:workShowAction', function (id){

        if(this.workView){
          this.workView.$el.undelegate();
        }

        var breadcrumbsView = new BreadcrumbsView();
        this.workView = new MainWorkView({"id": id});
      });

      app_router.on('route:groupProgressAction', function (id) {

        var groupProgressView = new GroupProgressView();
        groupProgressView.initialize();
        groupProgressView.loadData(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

      app_router.on('route:studentProgressAction', function (id) {

        var studentProgressView = new StudentProgressView();
        studentProgressView.initialize();
        studentProgressView.loadData(id);
        var breadcrumbsView = new BreadcrumbsView();
      });

       app_router.on('route:courseProgressAction', function (id) {

        var courseProgressView = new CourseProgressView();
        courseProgressView.initialize();
        courseProgressView.loadData(id);
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
        var checkInfo = GlobalUser.checkRole('teacher');
        if ((checkInfo.status == true) &&
            (GlobalUser.currentUser.attributes.role_pending == false)){
          if (GlobalUser.currentUser.attributes.teacher_attributes.teacher_id == id) {
            var teacherGroupView = new TeacherGroupView(id);
            var breadcrumbsView = new BreadcrumbsView();
          }
          else{
            GlobalUser.showWarning('У Вас немає доступу до цієї сторінки.');
          }
        } else {
          //defined in libs/reg
          GlobalUser.showWarning(checkInfo.text);
        }
      });

      app_router.on('route:userSingUp', function(){
        var userSignUp = new UserSingUpView();
        var breadcrumbsView = new BreadcrumbsView();
        userSignUp.render();
        $.getScript('/app/libs/reg/reg.js')
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
      app_router.on('route:searchAction', function(){

        var breadcrumbsView = new BreadcrumbsView();
        var searchView = new SearchView();
      });
      app_router.on('route:taskShow', function (id) {

        var breadcrumbsView = new BreadcrumbsView();

          if(this.currentTask){
            this.currentTask.$el.undelegate();
          }
          this.currentTask = new TaskView({"id": id});

      });

      app_router.on('route:defaultAction', function (actions) {
        var breadcrumbsView = new BreadcrumbsView();
        // We have no matching route, lets display the home page
        var facultiesListView = new FacultiesListView();
        facultiesListView.loadData();

        $("#main-page-link").addClass('active');
      });

      Backbone.history.start();
    };


    return {
      initialize: initialize
    };


  });
