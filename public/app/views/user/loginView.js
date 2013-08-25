define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'marionettes/user/init',
  'models/user/user_session',
  'models/user/user',
  'models/user/user_logout',
  'text!templates/shared/errorNotificationTemplate.html',
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, GlobalUser, UserSession, User, UserLogout, errorNotificationTemplate){ 
  GlobalUser.Views.Unauthenticated = GlobalUser.Views.Unauthenticated || {};

  GlobalUser.Views.Unauthenticated.Login = Backbone.Marionette.ItemView.extend({
    el: $('#logForm'),

    initialize: function() {
      this.model = new UserSession();
      this.modelBinder = new Backbone.ModelBinder();
    },

    onRender: function() {
      this.modelBinder.bind(this.model, this.el);
    },

    login: function() {
      $('#sendFormLog').attr('value', 'Завантаження...');
      $('.alert').remove();
      GlobalUser.Models.User = new User();

      var self = this,
          el = $(this.el);

      el.find('.alert-error').remove();

      this.model.set({"authenticity_token": $("meta[name='csrf-token']").attr('content'), 'user': {'email': $('#inputLoginLog').val(), 'password': $('#inputPasswordLog').val()}});

      this.model.save(this.model.attributes, {
        success: function(userSession, response) {
          GlobalUser.currentUser = GlobalUser.Models.User.set(response);
          GlobalUser.vent.trigger("authentication:logged_in");
          $('#sendFormLog').attr('value', 'Увійти');
        },
        error: function(userSession, response) {
          var data = $.parseJSON(response.responseText);
          //getting alert type for bootstrap error messages view. This function is in libs/reg/reg
          data.alertType = alertType(data);
          $('#launch').prepend(_.template(errorNotificationTemplate, data));
          $('#sendFormLog').attr('value', 'Увійти');
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
