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

      //Used to restore history to previous state
      //(WITHOUT triggering router) in case
      //of unsuccessful attempt to get to some url
      storeRoute: function(){
        this.history.push(Backbone.history.fragment)
      },
      previousRoute: function(){
        if (this.history.length > 1) {
          this.navigate(this.history[this.history.length-1], true)
        } 
      },


      //add active class to menu items
      updateMenu: function(){
        $(".page-link").removeClass('active');
        
        var path = Backbone.history.fragment;
        
        if(path == 'info'){
          $("#info-page-link").addClass('active');
        };
        if(path == 'search'){
          $("#search-page-link").addClass('active');
        };
        if(path == ''){
          $("#main-page-link").addClass('active');
        };
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

      function checkRole(role){
        if(GlobalUser.currentUser != undefined){
          if(GlobalUser.currentUser.role == role){
            return true;
          } 
        }
      }

      function showWarning(){

        app_router.previousRoute();
        $('#content #top-warning').remove
        $('#content').prepend($('<div id="top-warning" class="alert alert-error"><a class="close" data-dismiss="alert" href="#">×</a><span class="message">Ви намагались зайти на сторінку, до якої у вас немає прав доступу</span></div>'))
        $('#top-warning').delay(3000).fadeOut('slow');
      
      }



      var app_router = new AppRouter;

      app_router.on('route:homeAction', function (actions) {
       // display the home page
        var facultiesListView = new FacultiesListView();
        var breadcrumbsView = new BreadcrumbsView();
        
        $("#main-page-link").addClass('active');

      });


//----------------------------- zombie views ------------------------------//
      
      //close method for all views  
      Backbone.View.prototype.close = function(){

        this.remove();
        this.unbind();

        console.log('child closin...')
        console.log(this)

          if(this.childViews != undefined){
          for (i=0; i<this.childViews.length; i++){         
                  Backbone.View.prototype.close.call(this.childViews[i]);
                }  
          }
      };

      //remove main view if it already exists
      function manageViews(view){
        if ('currentView' in this){
          //console.log(this.currentView.el);
          this.currentView.close();
        } else {
          //console.log('no current view yet')
        }
        this.currentView = view;
      };


      app_router.on('route:viewAdminFacultyPage', function (){
        if(checkRole('faculty_admin')){
          var adminFacultyView = new AdminFacultyView();        
          //manageViews(adminFacultyView);
          var breadcrumbsView = new BreadcrumbsView();
        } else {
          showWarning();
        }
      });

      app_router.on('route:viewAdminPage', function (){
        if(checkRole('admin')){
          var adminView = new AdminView();
          //manageViews(adminView);
          var breadcrumbsView = new BreadcrumbsView();
        } else {
          showWarning();
        }

      });

//----------------------------- end zombies -------------------------//




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
        var teacherGroupView = new TeacherGroupView(id);
        var breadcrumbsView = new BreadcrumbsView();
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
