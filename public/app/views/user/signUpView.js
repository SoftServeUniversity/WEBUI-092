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
  'text!templates/shared/errorNotificationTemplate.html',
  'text!templates/shared/fieldErrorNoticeTemplate.html'
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, signUpTemplate, GlobalUser, UserRegistration, User, errorNotificationTemplate, fieldErrorNoticeTemplate){ 
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
      var el = $(this.el);
      el.find('.alert').remove();
      el.find('.help-block').remove();
      el.find('.control-group.error').removeClass('error');
      el.find('.btn-primary').attr('value', 'Завантаження...');
      if(
        $('#inputLastNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputFirstNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputFatherNameReg[aria-invalid = true]').is('input') == false &&
        $('#inputLoginReg[aria-invalid = true]').is('input') == false &&
        $('#inputPasswordReg[aria-invalid = true]').is('input') == false ){
        var self = this;

        GlobalUser.Models.User = new User();

        var frmData = $('#regForm').MytoJson();
        frmData.authenticity_token = $("meta[name='csrf-token']").attr('content')
        this.model.set(frmData);
        this.model.save(this.model.attributes, {
          success: function(userSession, response) {
            GlobalUser.currentUser = GlobalUser.Models.User.set(response);
            GlobalUser.vent.trigger("authentication:logged_in");
          },
          error: function(userSession, response) {
            var result = $.parseJSON(response.responseText);
            var data = {
              'error' : 'Не вдалось зареєструватись! Спробуйте ще раз. ',
              'alertType' : 'error'
            };
            el.find('form').prepend(_.template(errorNotificationTemplate, data));
            _(result.errors).each(function(errors,field) {
              $('#'+field+'_group').addClass('error');
              _(errors).each(function(error, i) {
                data = {
                  'error' : error
                };
                console.log(data);
                console.log(field);
                $('#'+field+'_group .controls').append(_.template(fieldErrorNoticeTemplate, data));
              });
            });
            el.find('.btn-primary').attr('value', 'Відправити');
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
