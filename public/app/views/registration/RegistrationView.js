define([

  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'models/student/StudentModel',
  'text!templates/registration/registrationTemplate.html',
  'views/user/loginView',
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, StudentModel, registrationTemplate, LoginView){

  return Backbone.View.extend({

    el: $("#authBox"),
    model: StudentModel,

    events: {
      'click #sendFormLog' : 'log',
      'click #logout'      : 'logout'
    },
    render: function(){
      var compiledTemplate = _.template( registrationTemplate );
      $("#authBox").append(compiledTemplate);
    },

    log: function(e){
      //login fields can't be blank
      console.log('__y_s__trigered log from RegistrationView. Pass controll to LoginView');
      if($('#inputLoginLog[aria-invalid = true]').is('input') == false && $('#inputPasswordLog[aria-invalid = true]').is('input') == false ){
        e.preventDefault();
        var loginView = new LoginView();
        loginView.login();
      }else{
        //notification
      }
    },
    logout: function(e){
      console.log('__y_s__trigered logout from RegistrationView. Pass controll to LoginView');
      e.preventDefault();
      var logOut = new LoginView();
      logOut.logout();
    }
  });
});