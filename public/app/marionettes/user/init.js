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
          return { status: true, verified: false,  text: textRolePending };
        } else {
          return { status : true, verified: true }
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

  GlobalUser.showAdminButton = function(tagid, link, text){
    var el = '<li style="display:none" id="link_admin"><a class="page-link" id="'+tagid+'page-link" href="'+link+'">'+text+'</a></li>';
    $('#main-top-menu').append($(el));
    $('#link_admin').fadeIn();
  }

  GlobalUser.hideAdminButton = function(){
    $("#link_admin").remove();
  }

  GlobalUser.adminRoleCheck = function(){
    var adminCheck = this.checkRole('admin');
    if (adminCheck.status){
      this.showAdminButton('admin', '#/admin', 'Сторінка адміністратора')
    }
    var faCheck = this.checkRole('faculty_admin')
    if(faCheck.status && faCheck.verified){
      this.showAdminButton('fa','#/fa', 'Адміністрування факультету')
    }
  };

















  $(document).trigger('csrfToken');
  GlobalUser.currentUserReload();

  return GlobalUser;
});