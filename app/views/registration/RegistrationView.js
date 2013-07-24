define([

  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'models/student/StudentModel',
  'text!templates/registration/registrationTemplate.html'

], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, StudentModel, registrationTemplate){

  var RegistrationView = Backbone.View.extend({

    el: $("#authBox"),
    model: StudentModel,

    events: {
      'click #sendFormReg' : 'reg',
      'click #sendFormLog' : 'log'
    },
   /**/ render: function(){
      var compiledTemplate = _.template( registrationTemplate );
      $("#authBox").html(compiledTemplate);
    },
    reg : function(e){
      e.preventDefault();
        var userRegModel = new StudentModel({
          url : "/app/mocks"
        });

       userRegModel.set({

         'lastName': $("#regForm").find("#inputLastNameReg").val(),
         'firstName': $("#regForm").find("#inputFirstNameReg").val(),
         'fatherName': $("#regForm").find("#inputFatherNameReg").val(),
         'role': $("#regForm").find("#role").val(),
         'selectGroupReg': $("#regForm").find("#selectGroupReg").val(),
         'inputLoginReg': $("#regForm").find("#inputLoginReg").val(),
         'inputPasswordReg': $("#regForm").find("#inputPasswordReg").val()

       });

      // THIS.MODEL.VALIDATE();
      
      alert(userRegModel.get("lastName"));
      userRegModel.save();
      alert('Reg form has been sent');

    },
    log : function(e){
      e.preventDefault();
      var userLogModel = new StudentModel({
        url : "/app/mocks"
      });

      userLogModel.set({

        'inputLoginLog': $("#logForm").find("#inputLoginLog").val(),
        'inputPasswordLog': $("#logForm").find("#inputPasswordLog").val()

      });
      var a = userLogModel.get("inputLoginLog");
      
      alert(a);
      userLogModel.save();
      alert('Log form has been sent');
    }
  });

    return RegistrationView;
});