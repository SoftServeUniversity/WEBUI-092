define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'text!templates/registration/signUpTemplate.html',
  'marionettes/user/init',
  'models/user/user_registration',
  'models/user/user',
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, signUpTemplate, GlobalUser, UserRegistration, User){ 
  GlobalUser.Views.Unauthenticated = GlobalUser.Views.Unauthenticated || {};

  GlobalUser.Views.Unauthenticated.Signup = Backbone.Marionette.ItemView.extend({
    template: signUpTemplate,

    el: $('#content'),

    initialize: function() {
      this.model = new UserRegistration();
    },

    onRender: function() {
      $("#content").html(_.template(signUpTemplate));
      $('#launch').slideUp(100);
      $('#launch-btn').show();
    },

    events: {
      'submit #regForm': 'signup'
    },

    signup: function(e) {
      e.preventDefault();
      if(
        $('#inputLastNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputFirstNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputFatherNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputLoginReg[aria-invalid = true]').is('input') == false &&
        $('#inputPasswordReg[aria-invalid = true]').is('input') == false ){
        var self = this,
          el = $(this.el);

        GlobalUser.Models.User = new User();

        el.find('.btn-primary').attr('value', 'Завантаження...');
        el.find('.alert-error').remove();
        el.find('.help-block').remove();
        el.find('.control-group.error').removeClass('error');

        var frmData = $('#regForm').MytoJson();
        frmData.authenticity_token = $("meta[name='csrf-token']").attr('content')
        this.model.set(frmData);
        this.model.save(this.model.attributes, {
          success: function(userSession, response) {
            GlobalUser.currentUser = GlobalUser.Models.User.set(response);
            GlobalUser.vent.trigger("authentication:logged_in");
          },
          error: function(userSession, response) {
            console.log('__y_s__registration error.');
            console.log(response);
            /*
            var result = $.parseJSON(response.responseText);
            el.find('form').prepend(GlobalUser.Helpers.Notifications.error("Unable to complete signup."));
            _(result.errors).each(function(errors,field) {
              $('#'+field+'_group').addClass('error');
              _(errors).each(function(error, i) {
                $('#'+field+'_group .controls').append(GlobalUser.Helpers.FormHelpers.fieldHelp(error));
              });
            });
            el.find('input.btn-primary').button('reset');
            */
          }
        });
      }else{
        //hende frontend validations
        console.log('__y_s__ I am in signUpView on signup: function(e) { But faled validation');
      }
    }
  });

  return GlobalUser.Views.Unauthenticated.Signup;
});
