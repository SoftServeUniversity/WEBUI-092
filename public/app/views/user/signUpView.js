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
  'text!templates/shared/fieldErrorNoticeTemplate.html',
  'collections/departments/TemporaryDepartmentCollection',
  'text!templates/registration/TeacherAttributesTemplate.html',
  'text!templates/registration/DepartmentOptionTemplate.html',
  'collections/groups/TemporaryGroupsCollection',
  'text!templates/registration/StudentAttributesTemplate.html',
  'text!templates/registration/GroupOptionTemplate.html',
  'text!templates/registration/RoleOptionTemplate.html'
], function($, _, Backbone, bootstrap, jqBootstrapValidation, reg, signUpTemplate, GlobalUser, UserRegistration, User, errorNotificationTemplate, fieldErrorNoticeTemplate, 
  TemporaryDepartmentCollection, TeacherAttributesTemplate, DepartmentOptionTemplate, TemporaryGroupsCollection, StudentAttributesTemplate, GroupOptionTemplate, RoleOptionTemplate){ 

  GlobalUser.Views.Unauthenticated = GlobalUser.Views.Unauthenticated || {};

  GlobalUser.Views.Unauthenticated.Signup = Backbone.Marionette.ItemView.extend({
    template: signUpTemplate,

    el: $('#content'),
    capcha: '',

    initialize: function() {
      this.model = new UserRegistration();
    },

    onRender: function() {
      $("#content").html(_.template(signUpTemplate));
      $('#launch').slideUp(100);
      $('#launch-btn').show();
      $(this.el).find(".roleStudent").hide();
      $(this.el).find(".roleTeacher").hide();
      this.populate_roles_select();
      this.generate_capcha();
    },

    generate_capcha: function(){
      this.capcha = '';
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
        this.capcha +=  possible.charAt(Math.floor(Math.random() * possible.length));
      var canvas = document.getElementById("capcha-canvas");
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "blue";
      context.font = "bold 16px Arial";
      context.fillText(this.capcha, 10, 25);
    },

    events: {
      'submit #regForm'      : 'signup',
      'change #roles-select' : 'loadDepartmets',
      'click #capcha-reload' : 'generate_capcha'
    },

    populate_roles_select: function(){
      var el = $(this.el);
      $.post('user_helper/populate_roles_select', null, function(roles){
        _.each(roles, function(role) {
          el.find('#roles-select').prepend( _.template( RoleOptionTemplate, role ) );
        });
      }, 'json');
    },

    loadDepartmets: function(e){
      var el = $(this.el);
      var value = e.currentTarget.value;
      if(value == 'student'){
        var groups = new TemporaryGroupsCollection();
        // adds theacher fields
        el.find('.roleStudent').html(_.template(StudentAttributesTemplate));
        groups.fetch({
          success: function(collection, response) {
            _.each(collection.models, function(model) {
              //populate department select with all curent departments. Pleace create atleast one department to test this.
              el.find('#group-id-select').prepend(_.template(GroupOptionTemplate, model.toJSON()));
            });
          },
          error: function(userSession, response) {
            //error hendler goes here
          }
        });
        el.find('.roleStudent').show();
        el.find('.roleTeacher').html('');
      }else if(value == 'teacher'){
        var departments = new TemporaryDepartmentCollection();
        // adds theacher fields
        el.find('.roleTeacher').html(_.template(TeacherAttributesTemplate));
        departments.fetch({
          success: function(collection, response) {
            _.each(collection.models, function(model) {
              //populate department select with all curent departments. Pleace create atleast one department to test this.
              el.find('#depertent-id-select').prepend(_.template(DepartmentOptionTemplate, model.toJSON()));
            });
          },
          error: function(userSession, response) {
            //error hendler goes here
          }
        });
        el.find('.roleTeacher').show();
        el.find('.roleStudent').html('');
      }else if(value == 'User'){
        el.find('.roleTeacher').html('');
        el.find('.roleStudent').html('');
      }
    },

    signup: function(e) {
      e.preventDefault();
      if($(this.el).find('#capcha-field').val() == this.capcha){
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

          // MytoJson transforms(serializes) forms input data into json. The definition can be found in libs/reg/reg.js
          var frmData = $('#regForm').MytoJson();
          frmData.authenticity_token = $("meta[name='csrf-token']").attr('content')
          this.model.set(frmData);
          this.model.save(this.model.attributes, {
            success: function(userSession, response) {
              GlobalUser.currentUser = GlobalUser.Models.User.set(response);
              GlobalUser.vent.trigger("authentication:logged_in");
            },
            error: function(userSession, response) {
              self.generate_capcha();
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
                  $('#'+field+'_group .controls').append(_.template(fieldErrorNoticeTemplate, data));
                });
              });
              el.find('.btn-primary').attr('value', 'Відправити');
            }
          });
        }else{
          //hende frontend validations
        }
      }else{ // if chapcha is invalid
        $(this.el).find('.alert').remove();
        var data = {
          'error' : 'Стрічка з малюнку введена невідно!. Спробуйде ще раз. ',
          'alertType' : 'error'
        };
        $(this.el).find('form').prepend(_.template(errorNotificationTemplate, data));
        this.generate_capcha();
      }
    }
  });

  return GlobalUser.Views.Unauthenticated.Signup;
});
