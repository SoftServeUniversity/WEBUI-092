define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
  'reg',
  'models/student/StudentModel'
], function($, _, Backbone, StudentModel, bootstrap, jqBootstrapValidation, reg){
  var RegistrationView = Backbone.View.extend({
    el: $("#authBox"),
    model: StudentModel,

    events: {
      'click #sendFormReg' : 'send',
      'click #submit-btn' : 'send'
    },
    send : function(){


      /* this.model.set({

         'lastName': $("#regForm").find("#inputLastNameReg").val(),
         'firstName': $("#regForm").find("#inputFirstNameReg").val(),
         'fatherName': $("#regForm").find("#inputFatherNameReg").val(),
         'role': $("#regForm").find("#role").val(),
         'selectGroupReg': $("#regForm").find("#selectGroupReg").val(),
         'inputLoginReg': $("#regForm").find("#inputLoginReg").val(),
         'inputPasswordReg': $("#regForm").find("#inputPasswordReg").val()

       });

      // THIS.MODEL.VALIDATE();
      */
      alert('form sent');
      //this.model.save();

    }
  });

    return RegistrationView;
});