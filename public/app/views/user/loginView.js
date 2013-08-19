define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'text!templates/registration/registrationTemplate.html',
  'marionettes/user/init',
  'models/user/user_session',
  'helpers/user/notifications',
  'models/user/user',
  'models/user/user_logout'
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, registrationTemplate, GlobalUser, UserSession, Notifications, User, UserLogout){ 
  GlobalUser.Views.Unauthenticated = GlobalUser.Views.Unauthenticated || {};

  GlobalUser.Views.Unauthenticated.Login = Backbone.Marionette.ItemView.extend({
    template: registrationTemplate,
    el: $('#logForm'),

    initialize: function() {
      this.model = new UserSession();
      this.modelBinder = new Backbone.ModelBinder();
    },

    onRender: function() {
      this.modelBinder.bind(this.model, this.el);
    },

    login: function() {
      GlobalUser.Helpers.Notifications = new Notifications();
      GlobalUser.Models.User = new User();

      var self = this,
          el = $(this.el);

      el.find('input.btn-primary').button('loading');
      el.find('.alert-error').remove();

      this.model.set({"authenticity_token": $("meta[name='csrf-token']").attr('content'), 'user': {'email': $('#inputLoginLog').val(), 'password': $('#inputPasswordLog').val()}});

      this.model.save(this.model.attributes, {
        success: function(userSession, response) {
          el.find('.btn-primary').button('reset');
          GlobalUser.currentUser = GlobalUser.Models.User.set(response);
          console.log(GlobalUser.currentUser);
          GlobalUser.vent.trigger("authentication:logged_in");
        },
        error: function(userSession, response) {
          var result = $.parseJSON(response.responseText);
          el.prepend(GlobalUser.Helpers.Notifications.error(result.error));
          el.find('.btn-primary').button('reset');
        }
      });
    },
    logout: function(){
      var userLogout = new UserLogout();
      userLogout.set({"authenticity_token": $("meta[name='csrf-token']").attr('content')})
      userLogout.save(userLogout.attributes,{
        success: function(userSession, response){
          if (response.csrfToken) {
            $("meta[name='csrf-token']").attr('content', response.csrfToken);
          }
          GlobalUser.vent.trigger("authentication:logged_out");
        },
        error: function(userSession, response){
          //handle an error
        }
      });
    }

  });

  return GlobalUser.Views.Unauthenticated.Login;
});
