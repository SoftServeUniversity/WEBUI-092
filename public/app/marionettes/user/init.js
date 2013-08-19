define([
    'underscore',
    'backbone',
    'modelbinder',
    'marionette',
    'text!templates/user/loggedInTemplate.html',
    'text!templates/user/loggedOutTemplate.html',
    'models/user/user',
], function(_, Backbone, binder, Marionette, loggedInTemplate, loggedOutTemplate, User) {
  GlobalUser = new Backbone.Marionette.Application();

  GlobalUser.Views = {};
  GlobalUser.Views.Layouts = {};
  GlobalUser.Models = {};
  GlobalUser.Models.User = new User();
  GlobalUser.Collections = {};
  GlobalUser.Routers = {};
  GlobalUser.Helpers = {};

  // Instantiated global layouts
  GlobalUser.layouts = {};
  GlobalUser.layouts.logged_in = _.template(loggedInTemplate);
  GlobalUser.layouts.logged_out = _.template(loggedOutTemplate);

  //Initiate global views

  GlobalUser.addRegions({
    main: '#main'
  });

  GlobalUser.vent.on("authentication:logged_in", function() {
    $('#launch-btn').replaceWith(GlobalUser.layouts.logged_in);
    $('#launch').slideUp(300);
    console.log('__y_s__vent.on("authentication:logged_in"');
  });

  GlobalUser.vent.on("authentication:logged_out", function() {
    console.log('__y_s__I am in GlobalUser.vent.on("authentication:logged_out", function()');
    $('#logout').replaceWith(GlobalUser.layouts.logged_out);
  });

  //receive current user
  $.post('user_helper/receive_current_user', null, function(user){
    if (user != false){
      GlobalUser.currentUser = GlobalUser.Models.User.set(user);
      GlobalUser.vent.trigger("authentication:logged_in");
      console.log(GlobalUser.currentUser);
    }else{
      GlobalUser.currentUser = null;
      GlobalUser.vent.trigger("authentication:logged_out");
      console.log(GlobalUser.currentUser);
    }
  }, 'json');


  // TODO: Routers and history start
  // BD.vent.on("layout:rendered", function() {
  //   Backbone.history.start({pushState: true});
  // });
  return GlobalUser;
});