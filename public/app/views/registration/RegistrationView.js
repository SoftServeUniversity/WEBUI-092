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
      'click #sendFormReg' : 'reg',
      'click #sendFormLog' : 'log',
      'click #logout'      : 'logout'
    },
    render: function(){
      var compiledTemplate = _.template( registrationTemplate );
      $("#authBox").append(compiledTemplate);
    },
    reg : function(e){
        var userRegModel = new StudentModel({
          url : "/app/mocks"
        });

       userRegModel.set({

         'lastName': $("#regForm").find("#inputLastNameReg").val(),
         'firstName': $("#regForm").find("#inputFirstNameReg").val(),
         'fatherName': $("#regForm").find("#inputFatherNameReg").val(),
         'role': $("#regForm").find("#role").val(),
         'inputLoginReg': $("#regForm").find("#inputLoginReg").val(),
         'inputPasswordReg': $("#regForm").find("#inputPasswordReg").val()

       });

       var role = userRegModel.get('role');

       if(role == 'Student'){
          userRegModel.set({
            'selectGroupReg': $("#regForm").find("#selectGroupReg").val()
          });
       }else if(role == 'Teacher'){
          userRegModel.set({
            'scienceStage': $("#regForm").find("#inputScienceStageReg").val(),
            'sciencePosition': $("#regForm").find("#inputPositionReg").val(),
            'selectDepartment': $("#regForm").find("#selectDepartmentReg").val()
          });
       }

      var log = userRegModel.get('inputLoginReg'),
       pass = userRegModel.get('inputPasswordReg'),
       lastN = userRegModel.get('lastName'),
       firstN = userRegModel.get('firstName'),
       fatherN = userRegModel.get('fatherName');

      if(log.length > 0 && 
        pass.length > 0 && 
        lastN.length > 0 &&
        firstN.length > 0 &&
        fatherN.length > 0){

          e.preventDefault();

            if(
                $('#inputLastNameReg[aria-invalid = true]').is('input') == false &&
                $('#inputFirstNameReg[aria-invalid = true]').is('input') == false &&
                $('#inputFatherNameReg[aria-invalid = true]').is('input') == false &&
                $('#inputLoginReg[aria-invalid = true]').is('input') == false &&
                $('#inputPasswordReg[aria-invalid = true]').is('input') == false 
              ){
              var a = userRegModel.toJSON();
              console.log(a);
            }
        }
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