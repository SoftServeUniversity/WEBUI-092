define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqBootstrapValidation',
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
  'collections/faculties/FacultiesCollection',
  'text!templates/registration/FaAttributesTemplate.html',
  'text!templates/registration/StudentAttributesTemplate.html',
  'text!templates/registration/GroupOptionTemplate.html',
  'text!templates/registration/RoleOptionTemplate.html',
  'text!templates/registration/FaOptionTemplate.html',
  'text!templates/registration/EditRegistrationsTemplate.html'
], function($, _, Backbone, bootstrap, jqBootstrapValidation, signUpTemplate,
            GlobalUser, UserRegistration, User, errorNotificationTemplate, fieldErrorNoticeTemplate, 
            TemporaryDepartmentCollection, TeacherAttributesTemplate, DepartmentOptionTemplate,
            TemporaryGroupsCollection, FacultiesCollection, FaAttributesTemplate, StudentAttributesTemplate,
            GroupOptionTemplate, RoleOptionTemplate, FaOptionTemplate, EditRegistrationsTemplate ){ 

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
      //$(this.el).find(".roleStudent").hide();
      //$(this.el).find(".roleTeacher").hide();
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
      'change #roles-select' : 'generateTeacherStudentFields',
      'click #capcha-reload' : 'generate_capcha',
      'submit #editForm'     : 'update'
    },

    populate_roles_select: function(){
      var me = this;

      var el = $(this.el);
      $.post('user_helper/populate_roles_select', null, function(roles){
        _.each(roles, function(role) {
          el.find('#roles-select').prepend( _.template( RoleOptionTemplate, role ) );
        });

        me.selectDefaultRole('student');   
      }, 'json');
    },
    
    selectDefaultRole: function(role){
      $('#roles-select option[value="'+role+'"]').attr('selected', 'selected').trigger('change');
    },

    generateTeacherStudentFields: function(e){
      var value = e.currentTarget.value;
      this.swapFields(value);
    },

    swapFields: function(value){
      var el = $(this.el);
      var params = { user: '' };
      if (value == 'student'){
        var groups = new TemporaryGroupsCollection();
        
        // adds student fields
        if (GlobalUser.currentUser){
          params = { user: GlobalUser.currentUser.attributes.student_attributes }
        }

        el.find('#roleFields').html(_.template(StudentAttributesTemplate, params ));
        groups.fetch({
          success: function(collection, response) {
            el.find('#group-id-select').empty();
            _.each(collection.models, function(model) {
              // populate department select with all curent departments. Pleace create atleast one department to test this.
              el.find('#group-id-select').prepend(_.template(GroupOptionTemplate, model.toJSON()));
            });

            // Student's current group will be selected
            if (GlobalUser.currentUser) {
              el.find('.group-opt[value='+ GlobalUser.currentUser.attributes.student_attributes.group_id + ']').attr('selected', 'true');
            }
          }
        });

      } else if(value == 'teacher'){
        
        var departments = new TemporaryDepartmentCollection();
        
        // adds teacher fields
        if (GlobalUser.currentUser){
          params = { user: GlobalUser.currentUser.attributes.teacher_attributes }
        }

        el.find('#roleFields').html(_.template(TeacherAttributesTemplate, params));
        departments.fetch({
          success: function(collection, response) {
            el.find('#department-id-select').empty();
            _.each(collection.models, function(model) {
              //populate department select with all curent departments. Pleace create atleast one department to test this.
              el.find('#department-id-select').prepend(_.template(DepartmentOptionTemplate, model.toJSON()));
            });

            // Teacher's current department will be selected
            if (GlobalUser.currentUser) {
              el.find('.departments-opt[value=' + GlobalUser.currentUser.attributes.teacher_attributes.department_id + ']').attr('selected', 'true');
            }
          }
        });

      } else if(value == 'faculty_admin'){
        var params;
        var faculties = new FacultiesCollection();
        
        // adds faculty admin fields 
        if (GlobalUser.currentUser){
          params = { user: GlobalUser.currentUser.attributes.faculty_admin_attributes }
        }

        el.find('#roleFields').html(_.template(FaAttributesTemplate, params));
        faculties.fetch({
          success: function(collection, response) {
            el.find('#faculty-id-select').empty();
            _.each(collection.models, function(model) {
              //populate department select with all curent departments. Pleace create atleast one department to test this.
              el.find('#faculty-id-select').prepend(_.template(FaOptionTemplate, model.toJSON()));
            });
           
            // FA's current faculty will be selected
            if (GlobalUser.currentUser){
              el.find('.faculty-opt[value=' + GlobalUser.currentUser.attributes.faculty_admin_attributes.faculty_id + ']').attr('selected', 'true');
            }
          }
        });

      } else if(value == 'guest'){
        el.find('#roleFields').empty()
      }
    },

    edit: function(){
      $(this.el).html(_.template(EditRegistrationsTemplate, GlobalUser.currentUser.attributes));
      this.swapFields( GlobalUser.currentUser.role );
    },

    cancel: function(){
      this.model.set(GlobalUser.currentUser)
      this.model.destroy({success: function(model, response) {
        GlobalUser.vent.trigger("authentication:logged_out");
        window.location.hash = '/';
      }});
    },

    update: function(e){
      var el = $(this.el);
      el.find('.btn-primary').attr('value', 'Завантаження...');
      e.preventDefault();

      var frmData = el.find('#editForm').MytoJson();
      frmData['id'] = GlobalUser.currentUser.id;

      this.model.set(frmData);
      this.model.save(this.model.attributes, {
        success: function(userSession, response) {
          GlobalUser.currentUserReload();
          GlobalUser.vent.trigger("authentication:logged_in");
        },
        error: function(userSession, response) {
          var result = $.parseJSON(response.responseText);
          var data = {
            'error' : 'Не вдалось оновити профіль! Спробуйте ще раз. ',
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
