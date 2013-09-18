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
    'collections/groups/GroupsCollection',
    'models/teacher/TeacherModel',
    'models/work/WorkModel',
    'models/task/TaskModel',
    'collections/students/StudentsProxyCollectionForTeacherPage'
], function($, _, Backbone,
            bootstrap,
            jqBootstrapValidation,
            DepartmentsCollection,
            CoursesCollection,
            TableView,
            teacherAddWorkDialogTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            GroupsCollection,
            TeacherModel,
            WorkModel,
            TaskModel,
            StudentsProxyCollectionForTeacherPage){

    var TeacherView = Backbone.View.extend({

      el_modal: '#dialogAddStudentWork',

      events: {
        "click #btnAddWork": "sendForm",
        "click #btnAddWorkAndContinue": "sendForm"
      },
/*
      function ObserveChain(chain) {
        for(key in chain) {
          $('#ChainOfChoice' + key).onChange({
            var colection  = key[nextColl].fetch({
              data: {
                filter: {
                  teacher_id: id
                }
              },
              success: function() {
                me.trigger('DataLoaded', 'StudentsOfTeacherGroup');
              }
            });




            if fetch succes
              $('#' + key).enable();
          })
        };
      },

/*
      function DisableChain (chain) {
        var trigger = false;
        for(index in chain){
          if (index == key){
            triger = true;
          };
          if (triger){
            $('#'+index).disable();
            $('#'+index).DisableChain();
          };
        };
      },
*/
      initialize:function(id){
        var me = this;

        //me.currentTeacherId = id;

        this.chainOfResp = {
          1: {nextKey: 2, nextColl: DepartmentsCollection},
          2: {nextKey: 3, nextColl: GroupsCollection},
          3: {nextKey: 4, nextColl: StudentsProxyCollectionForTeacherPage}
        };

        //ObserveChain(this.chainOfResp);

        //For get info about
        //teacher faculty and department
        this.teacherModel = new TeacherModel();
        this.teacherModel.fetch({
          async: false, //for wait, when load data
          data: {
            filter: {
              id: id
            }
          },
          success: function(model, response) {
            me.teacherFacultyId = model.toJSON()[0].faculty_id;
            me.teacherDepartmentId = model.toJSON()[0].department_id;
          }
        });

        this.facultiesCollection = new FacultiesCollection();
        this.facultiesCollection.fetch({
          success: function() {
            me.trigger('DataLoaded', 'Faculties');
          }
        });

        this.departmentsCollection = new DepartmentsCollection();
        this.departmentsCollection.fetch({
          data: {
            filter: {
              faculty_id: me.teacherFacultyId
            }
          },
          success: function() {
            me.trigger('DataLoaded', 'Departments');
          }
        });

        this.groupsCollection = new GroupsCollection();
        this.groupsCollection.fetch({
          data: {
            filter: {
              department_id: me.teacherDepartmentId
            }
          },
          success: function() {
            me.trigger('DataLoaded', 'Groups');
          }
        });

        var isFacultiesLoaded = false;
        var isDepartmentsLoaded = false;
        var isGroupsLoaded = false;

        this.on('DataLoaded', function (item) {
          if (item == 'Faculties'){
            isFacultiesLoaded = true;
            console.log('Faculties Loaded');
          }

          if (item == 'Departments'){
            isDepartmentsLoaded = true;
            console.log('Departments Loaded');
          }

          if (item == 'Groups'){
            isGroupsLoaded = true;
            console.log('Groups Loaded');
          }

          if ((isFacultiesLoaded &&
               isDepartmentsLoaded &&
               isGroupsLoaded) == true){
            me.render(id);
          }
        });
      },

      render: function(id){
        var teacher = this.teacherModel.toJSON()[0];
        console.log(this.facultiesCollection);
        console.log(this.departmentsCollection);
        console.log(this.groupsCollection);

        var dataForTeacherAddWorkDialogTemplate = {
          teacher: teacher,
          faculties: this.facultiesCollection,
          departments: this.departmentsCollection,
          groups: this.groupsCollection
        }
        var compiledTemplate = _.template(teacherAddWorkDialogTemplate, dataForTeacherAddWorkDialogTemplate);
        this.$el.html(compiledTemplate);

        return this;
      },

      sendForm: function(e){
        //
        var me = this;

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
                  };

                  // Hide modal dialog after save model to database
                  me.hideModalWindow();

                },
                // add hendler error
                error: function(model, response) {
                  alert(response);
              }
            });

          }
        }

        return this;
      },

      hideModalWindow: function(){
        $(this.el_modal).modal('hide');
        $(this.el_modal).removeData('modal');
        this.unLink();
      },

      unLink: function(){
        this.undelegateEvents();
      }

    });

    return TeacherView;
});