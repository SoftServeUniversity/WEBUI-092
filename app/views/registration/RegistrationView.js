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

      // THIS.MODEL.VALIDATE();

      var a = userRegModel.toJSON();
      console.log(a);

      //userRegModel.save(a);
      //alert('Reg form has been sent');

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
      
      var a = userLogModel.toJSON();
      console.log(a);

      //userLogModel.save();
      //alert('Log form has been sent');
    }
  });

    return RegistrationView;
});