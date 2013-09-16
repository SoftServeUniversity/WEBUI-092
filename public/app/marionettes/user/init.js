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
  GlobalUser.Views.Layouts = {};
  GlobalUser.Models = {};
  GlobalUser.Models.User = new User();
  GlobalUser.Collections = {};
  GlobalUser.Routers = {};
  GlobalUser.Helpers = {};

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

  // Instantiated global layouts
  GlobalUser.layouts = {};
  GlobalUser.layouts.logged_out = _.template(loggedOutTemplate);

  //Initiate global views
  GlobalUser.addRegions({
    main: '#main'
  });

  //callbacks
  GlobalUser.vent.on("authentication:logged_in", function() {
    GlobalUser.currentUser = GlobalUser.Models.User.set(GlobalUser.currentUser);
    GlobalUser.getRole(GlobalUser.currentUser.id);
    GlobalUser.getAbilities();
    $('#launch-btn').replaceWith(_.template(loggedInTemplate));
    $('#launch').slideUp(300);
    window.location.hash = '/';
  });

  GlobalUser.vent.on("authentication:logged_out", function() {
    $('#logout-container').replaceWith(GlobalUser.layouts.logged_out);
  });

  //receive current user
  GlobalUser.vent.on("role_loaded", function(data){ GlobalUser.currentUser.role = data });
  GlobalUser.vent.on("abilities_loaded", function(data){ GlobalUser.currentUser.abilities = data });

  GlobalUser.getRole = function(id){
    $.post('user_helper/return_current_role', {id: id}, null, 'text' ).done(function(res){ GlobalUser.vent.trigger("role_loaded", res) }); 
  }

  GlobalUser.getAbilities = function(){
    $.post('user_helper/receive_user_abilities', null, null, "json").done(function(res){ GlobalUser.vent.trigger("abilities_loaded", res) }); 
  }


  // TODO: Routers and history start
  // BD.vent.on("layout:rendered", function() {
  //   Backbone.history.start({pushState: true});
  // });
  //receive current user
  $(document).trigger('csrfToken');
  GlobalUser.currentUserReload();
  return GlobalUser;
});