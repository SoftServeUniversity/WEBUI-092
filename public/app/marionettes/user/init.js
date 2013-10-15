define([
    'reg',
    'underscore',
    'backbone',
    'modelbinder',
    'marionette',
    'text!templates/user/loggedInTemplate.html',
    'text!templates/user/loggedOutTemplate.html',
    'models/user/user',
], function(regLib, _, Backbone, binder, Marionette, loggedInTemplate, loggedOutTemplate, User) {
  GlobalUser = new Backbone.Marionette.Application();

  GlobalUser.Views = {};
  GlobalUser.Models = {};
  GlobalUser.layouts = {};
  GlobalUser.Models.User = new User();

  GlobalUser.currentUserReload = function(){
    $.post('user_helper/receive_current_user', null, function(user){
      if (user != false){
        GlobalUser.currentUser = GlobalUser.Models.User.set(user);
        GlobalUser.vent.trigger("authentication:logged_in");
      }else{
        GlobalUser.currentUser = null;
        GlobalUser.vent.trigger("authentication:logged_out");
      }
    }, 'json');
  }

  GlobalUser.layouts.logged_out = _.template(loggedOutTemplate);

  GlobalUser.addRegions({
    main: '#main'
  });

  GlobalUser.vent.on("authentication:logged_in", function() {
    GlobalUser.currentUser = GlobalUser.Models.User.set(GlobalUser.currentUser);
    GlobalUser.getRole(GlobalUser.currentUser.id);
    GlobalUser.getAbilities();
    $('#launch-btn').replaceWith(_.template(loggedInTemplate));
    $('#launch').slideUp(300);
    //window.location.hash = '/';
  });

  GlobalUser.vent.on("authentication:logged_out", function() {
    $('#logout-container').replaceWith(GlobalUser.layouts.logged_out);
  });

  GlobalUser.vent.on("role_loaded", function(data){ GlobalUser.currentUser.role = data });
  GlobalUser.vent.on("abilities_loaded", function(data){ GlobalUser.currentUser.abilities = data });

  GlobalUser.getRole = function(id){
    $.post('user_helper/return_current_role', {id: id}, null, 'text' ).done(function(res){ GlobalUser.vent.trigger("role_loaded", res) });
  }

  GlobalUser.getAbilities = function(){
    $.post('user_helper/receive_user_abilities', null, null, "json").done(function(res){ GlobalUser.vent.trigger("abilities_loaded", res) });
  }



  GlobalUser.checkRole = function(role){

    var notRegistered = 'Для доступу до цієї сторінки необхідно бути зареєстрованим і мати роль ';
    var textRolePending = 'Ваш акаунт ще не підтверджений адміністратором';
    var textBadRole = 'Роль вашого користувача не надає доступу до цієї сторінки. Зареєструйте користувача з роллю '

    if(GlobalUser.currentUser != undefined){

      if(GlobalUser.currentUser.role == role){
        if(GlobalUser.currentUser.attributes.role_pending){
          return { status: true, verified: false,  text: textRolePending, role: role };
        } else {
          return { status : true, verified: true, role: role }
        }
      } else {
        return { status: false, text: textBadRole + role }
      }

    } else {
      return { status: false, text: notRegistered + role }
    }

  }


  GlobalUser.showWarning = function(warning, role){

    app_router.previousRoute();
    $('#content #top-warning').remove();
    $('#content').prepend($('<div id="top-warning" class="alert alert-error"><a class="close" data-dismiss="alert" href="#">×</a><span class="message">'+warning+'</span></div>'))
    $('#top-warning').delay(3000).fadeOut('slow');

  }

  GlobalUser.showUserHomeButton = function(tagid, link, text){
    var el = '<li style="display:none" id="link_userHomeBtn"><a class="page-link" id="'+tagid+'page-link_id" href="'+link+'">'+text+'</a></li>';
    $('#main-top-menu').append($(el));
    $('#link_userHomeBtn').fadeIn();
  }

  GlobalUser.hideUserHomeButton = function(){
    $("#link_userHomeBtn").remove();
  }

  //Function for check role when login user and display button 'UserHomePage'
  GlobalUser.userRoleCheck = function(config){
    if(GlobalUser.currentUser != undefined){
      var currentUserRole = GlobalUser.currentUser.role;
      if (currentUserRole == 'admin'){
        var adminCheck = this.checkRole('admin');
        if (adminCheck.status){
          this.showUserHomeButton('admin', '#/admin', 'Сторінка адміністратора');
          if(config.redirect){ window.location.hash = '#/admin'; };
        }

      } else if (currentUserRole == 'faculty_admin'){
        var faCheck = this.checkRole('faculty_admin')

        //if faculty admin is verified - redirect him to his own page
        if(faCheck.status && faCheck.verified){
          this.showUserHomeButton('fa','#/fa', 'Адміністрування факультету');
          if(config.redirect){window.location.hash = '#/fa'};
        
        //if faculty admin is not verified - redirect him to home page
        } else {
          window.location.hash = '/';
        }

      } else if (currentUserRole == 'teacher'){
        var teacherCheck = this.checkRole('teacher')
        if(teacherCheck.status && teacherCheck.verified)
        {
          var teacherId = GlobalUser.currentUser.attributes.teacher_attributes.teacher_id;
          if (teacherId){
            this.showUserHomeButton('teacher','#/teacher/' + teacherId, 'Моя сторінка');
            if(config.redirect){window.location.hash = '#/teacher/'+teacherId};
          }
        } else {
          window.location.hash = '/';
        }

      } else if (currentUserRole == 'student'){
        var studentCheck = this.checkRole('student')
        if(studentCheck.status && studentCheck.verified)
        {
          var studentId = GlobalUser.currentUser.attributes.student_attributes.student_id;
          if (studentId){
            this.showUserHomeButton('student','#/student/' + studentId, 'Моя сторінка');
            if(config.redirect){window.location.hash = '#/student/' + studentId};
          }
        } else {
          window.location.hash = '/';
        }

      } 
    }
  }



  $(document).trigger('csrfToken');
  GlobalUser.currentUserReload();

  return GlobalUser;
});