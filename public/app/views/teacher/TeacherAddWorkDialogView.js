define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'jqBootstrapValidation',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/teacher/TableView',
    'text!templates/teacher/teacherAddWorkDialogTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',
    'models/teacher/TeacherModel',
    'models/work/WorkModel',
    'models/task/TaskModel',
    'collections/students/StudentsProxyCollectionForTeacherPage',
    'collections/teachers/TeachersCollection',
], function($, _, Backbone,
            bootstrap,
            jqBootstrapValidation,
            DepartmentsCollection,
            CoursesCollection,
            TableView,
            teacherAddWorkDialogTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeacherModel,
            WorkModel,
            TaskModel,
            StudentsProxyCollectionForTeacherPage,
            TeachersCollection){

    var TeacherView = Backbone.View.extend({

        events: {
          //"click #btnAddWork": "sendForm",
          "click #btnAddWorkAndContinue": "sendForm"
        },

        initialize:function(id){
            var me = this;

            this.currentTeacherId = id;

            this.teacherModel = new TeacherModel();
            this.teacherModel.fetch({
              data: {
                filter: {
                  id: id
                }
              },
              success: function() {
                me.trigger('DataLoaded', 'Teacher');
              }
            });

            this.studentsColOfTeachGroup = new StudentsProxyCollectionForTeacherPage();
            this.studentsColOfTeachGroup.fetch({
              data: {
                filter: {
                  teacher_id: id
                }
              },
              success: function() {
                me.trigger('DataLoaded', 'StudentsOfTeacherGroup');
              }
            });

            this.faculty_change_col = new FacultyChangeCollection();
            this.faculty_change_col.fetch({
              success:function () {
                  me.trigger('DataLoaded', 'FacultyChange');
              }
            });

            var isTeachLoaded = false;
            var isStudentsOfTeacherGroupLoaded = false;
            var isFacChangeLoaded = false;

            this.on('DataLoaded', function (item) {
                if (item == 'Teacher') {
                    isTeachLoaded = true;
                }

                if (item == 'StudentsOfTeacherGroup'){
                    isStudentsOfTeacherGroupLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded &&
                     isFacChangeLoaded &&
                     isStudentsOfTeacherGroupLoaded) == true){
                  me.render(id);
                }
            });
        },

        render: function(id){
          var teacher = this.teacherModel.toJSON()[0];

          var dataForTeacherAddWorkDialogTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(teacherAddWorkDialogTemplate, dataForTeacherAddWorkDialogTemplate);
          this.$el.html(compiledTemplate);

          return this;
        },

        sendForm: function(e){
          //
          if ($("#inputWorkName").val().length > 0 &&
              $("#selFaculty").val().length > 0 &&
              $("#selDepartment").val().length > 0 &&
              $("#selGroup").val().length > 0 &&
              $("#selStudent").val().length > 0)
          {
            //
            e.preventDefault();

            //
            if ($("#inputWorkName[aria-invalid = true]").is('textarea') == false &&
                $("#selFaculty[aria-invalid = true]").is('select') == false &&
                $("#selDepartment[aria-invalid = true]").is('select') == false &&
                $("#selGroup[aria-invalid = true]").is('select') == false &&
                $("#selStudent[aria-invalid = true]").is('select') == false)
            {
              // Create WorkModel and save it for add into database
              this.workModel = new WorkModel();
              this.workModel.set('name', $("#inputWorkName").val());
              this.workModel.set('student_id', $("#selStudent").find(":selected").val());
              this.workModel.set('teacher_id', this.currentTeacherId);
              this.workModel.save(
                // wait, while response coming
                {wait: true},
                // get response
                {
                  success: function(model, response) {
                    // Create TaskModel of each option in default tasks list
                    // and save it for add into database
                    var selectedTasks = $("#selDefaultTasks").find(":selected");
                    if (selectedTasks.length > 0)
                    {
                      for (var i = 0; i < selectedTasks.length; i++)
                      {
                        this.taskModel = new TaskModel();
                        this.taskModel.set('name', selectedTasks[i].text);
                        this.taskModel.set('work_id', model.get('id'));
                        this.taskModel.set('priority', i);
                        this.taskModel.save();
                      }
                    } else {
                      console.log("No selectedTasks");
                    }

                  },
                  // add hendler error
                  error: function(model, response) {
                    alert(response);
                }
              });

            }
          }

          return this;
        }

    });
    return TeacherView;
});