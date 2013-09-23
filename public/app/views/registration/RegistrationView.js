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

      var compiledTemplate = _.template(registrationTemplate);
      $("#authBox").append(compiledTemplate());

      $('#close-btn, #exit-btn').click(function(){
        $('#launch').slideUp(100);
        $('#launch-btn').show();
      });

      //session
      $('#launch-btn').show();
      $(".tip").tooltip();
      $("input[type=text], textarea, input[type=password]").jqBootstrapValidation();
      // #launch-btn is a dinamic element, that because we need to delegate it functionality
      $("#authBox").delegate('#launch-btn','click', function(e){
        e.preventDefault();
        console.log('Log In');
        $(this).hide();
        $('#launch').slideDown(300);

      });

      //registration
      $('#openModal').click(function(){
        $('#regMod').slideDown(300);
      });

      $('#sign-up-louncher').click(function(){
        $('#launch').slideUp(100);
      });

      $('#closeRegForm').click(function(){
        $('#regMod').slideUp(300);
      });

    },

    log: function(e){
      if($('#inputLoginLog[aria-invalid = true]').is('input') == false && $('#inputPasswordLog[aria-invalid = true]').is('input') == false ){
        e.preventDefault();
        var loginView = new LoginView();
        loginView.login();

      }else{
        //notification
      }
    },
    logout: function(e){
      e.preventDefault();
      var logOut = new LoginView();
      logOut.logout();
    }
  });
});