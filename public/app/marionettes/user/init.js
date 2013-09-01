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
    GlobalUser.currentUser.role = GlobalUser.Models.User.getRole();
    GlobalUser.currentUser.abilities = GlobalUser.Models.User.getAbilities();
    $('#launch-btn').replaceWith(_.template(loggedInTemplate));
    $('#launch').slideUp(300);
    window.location.hash = '/';
  });

  GlobalUser.vent.on("authentication:logged_out", function() {
    $('#logout-container').replaceWith(GlobalUser.layouts.logged_out);
  });

  //receive current user
  $(document).trigger('csrfToken');
  GlobalUser.currentUserReload();


  // TODO: Routers and history start
  // BD.vent.on("layout:rendered", function() {
  //   Backbone.history.start({pushState: true});
  // });
  return GlobalUser;
});