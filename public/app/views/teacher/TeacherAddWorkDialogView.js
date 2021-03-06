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
    'collections/teachers/TeachersCollection',
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
            TeachersCollection,
            WorkModel,
            TaskModel,
            StudentsProxyCollectionForTeacherPage){

    var TeacherAddWorkDialogView = Backbone.View.extend({

      events: {
        "click #btnAddWork": "sendForm",
        "click #btnAddWorkAndContinue": "sendForm",
        "click #btnCloseModalWindow": "closeModalWindow"
      },

      // Clear all list after current
      ClearChain: function(key) {
        var currKey = key;
        while (this.chainOfResp[currKey]){
          $('#' + this.chainOfResp[currKey].nextKey).empty();
          currKey = this.chainOfResp[currKey].nextKey;
        }
      },

      // Disable all list after next list
      DisableChain: function(key) {
        var currKey = key;
        while (this.chainOfResp[currKey]){
          $('#' + this.chainOfResp[currKey].nextKey).prop('disabled', 'disabled');
          currKey = this.chainOfResp[currKey].nextKey;
        }
      },

      // Enable one list by key of chainOfResp
      EnableChain: function(key) {
        $('#' + this.chainOfResp[key].nextKey).prop('disabled', null);
      },

      // Fill list after changed list
      FillChain: function(key) {
        var me = this;
        var collection = new this.chainOfResp[key].nextColl;
        var idForCollectionFilter = parseInt($("#" + key).find(":selected").val());
        var filterName = this.chainOfResp[key].filterName;
        var filterForFetchCollection = {};
        filterForFetchCollection[filterName] = idForCollectionFilter;
        collection.FetchCollection(filterForFetchCollection);
        if(collection.length > 0) {
          var collectionJSON = collection.toJSON();
          // Append to select list empty <option>
          $('#' + me.chainOfResp[key].nextKey).append($('<option>', {}));

          //Function for append <options> to select
          function fillSelect(i, item){
            //  me = this;
            $('#' + me.chainOfResp[key].nextKey).append($('<option>', {
                value: item.id,
                text : item.name
              }));
          }

          // Append to select list <options> with data for choice
          $.each(collectionJSON, function (i, item) {
            if (!(item.role_pending)){
              fillSelect(i, item);
            }
            else if (item.role_pending == 0){
              fillSelect(i, item);
            }
          });
        }
      },

      ObserveChain: function(chain) {
        var me = this;
        for(var key in chain){
          $('#' + key).on('change', function(e){
            var eventTargetId = e['currentTarget'].id;
            // Get next select list id for disable lists after current
            var keyForDisable = me.chainOfResp[eventTargetId].nextKey;
            // Clear select lists after changed list
            me.ClearChain(eventTargetId);
            // Disable select lists after list next selected
            me.DisableChain(keyForDisable);
            // Fill next list after selected list
            me.FillChain(eventTargetId);
            // Enable filled chain
            me.EnableChain(eventTargetId);
          });
        };
      },

      initialize:function(id, worksCollection){
        var me = this;

        this.currentTeacherId = id;
        this.currenrWorksCollection = worksCollection;

        // Id of div of modal window for add works
        this.el_modal = '#dialogAddStudentWork';
        // Id form in modal window for add works
        this.modal_form = 'taskCreateForm';
        // List of works for add to collection
        this.workModelsList = [];

        //For get info about
        //teacher faculty and department
        this.teachersCollection = new TeachersCollection();
        this.teachersCollection.fetch({
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
          }

          if (item == 'Departments'){
            isDepartmentsLoaded = true;
          }

          if (item == 'Groups'){
            isGroupsLoaded = true;
          }

          if ((isFacultiesLoaded &&
               isDepartmentsLoaded &&
               isGroupsLoaded) == true){
            me.render(id);
          }
        });
      },

      render: function(id){
        var dataForTeacherAddWorkDialogTemplate = {
          teacher: this.teachersCollection.toJSON()[0],
          faculties: this.facultiesCollection.toJSON(),
          departments: this.departmentsCollection.toJSON(),
          groups: this.groupsCollection.toJSON()
        }
        var compiledTemplate = _.template(teacherAddWorkDialogTemplate, dataForTeacherAddWorkDialogTemplate);
        this.$el.html(compiledTemplate);

        // Default select faculty and department of teacher
        $("#ChainOfChoice1 option[value='" + this.teacherFacultyId + "']").attr("selected", "selected");
        $("#ChainOfChoice2 option[value='" + this.teacherDepartmentId + "']").attr("selected", "selected");

        // Set select of students as inactive
        $("#ChainOfChoice4").prop('disabled', 'disabled');

        this.chainOfResp = {
          'ChainOfChoice1': {nextKey: 'ChainOfChoice2', nextColl: DepartmentsCollection, filterName: 'faculty_id'},
          'ChainOfChoice2': {nextKey: 'ChainOfChoice3', nextColl: GroupsCollection, filterName: 'department_id'},
          'ChainOfChoice3': {nextKey: 'ChainOfChoice4', nextColl: StudentsProxyCollectionForTeacherPage, filterName: 'group_id'}
        };

        // Add handler for events, when change choice of selects
        this.ObserveChain(this.chainOfResp);
        // Add Bootstrap Validation to textarea box of work name
        $("input[type=text], textarea").jqBootstrapValidation();

        return this;
      },

      sendForm: function(e){
        var me = this;

        // Inspect form for add works
        if ($("#inputWorkName").val().length > 0 &&
            // Inspect Faculty select
            $("#ChainOfChoice1").val().length > 0 &&
            // Inspect Department select
            $("#ChainOfChoice2").val().length > 0 &&
            // Inspect Group select
            $("#ChainOfChoice3").val().length > 0 &&
            // Inspect Student select
            $("#ChainOfChoice4").val().length > 0)
        {
          // Cancel event e
          e.preventDefault();

          // If validation is not confirm - set attribute "aria-invalid = true"
          if ($("#inputWorkName[aria-invalid = true]").is('textarea') == false &&
              $("#ChainOfChoice1[aria-invalid = true]").is('select') == false &&
              $("#ChainOfChoice2[aria-invalid = true]").is('select') == false &&
              $("#ChainOfChoice3[aria-invalid = true]").is('select') == false &&
              $("#ChainOfChoice4[aria-invalid = true]").is('select') == false)
          {
            // Create object of WorkModel
            // and save it for add into database
            this.workModel = new WorkModel();
            this.workModel.set('name', $("#inputWorkName").val());
            this.workModel.set('student_id', $("#ChainOfChoice4").find(":selected").val());
            this.workModel.set('teacher_id', this.currentTeacherId);
            this.workModel.save(
              // wait, while response coming
              {wait: true},
              // get response
              {
                success: function(model, response) {
                  // Create TaskModel of each option in default tasks list
                  // and save it for add into database
                  var checkedTasks = $(".chbDefaultTasks").find(":checked");
                  if (checkedTasks.length > 0)
                  {
                    for (var i = 0; i < checkedTasks.length; i++)
                    {
                      this.taskModel = new TaskModel();
                      this.taskModel.set('name', checkedTasks[i].value);
                      this.taskModel.set('work_id', model.get('id'));
                      this.taskModel.set('priority', i);
                      this.taskModel.save();
                    }
                  } else {
                    console.log("No checked Tasks");
                  };

                  // Reset data of modal dialog after save model to database
                  me.resetDataOfModalWindow();
                  // If click on button "Записати" - hide modal dialog
                  if (e.target.id == 'btnAddWork') {
                    // Add corrent work model to specially list
                    // BEFORE hihe ModalWindow
                    me.workModelsList.push(me.workModel);
                    me.hideModalWindow();
                  } else {
                    // Add corrent work model to specially list
                    me.workModelsList.push(me.workModel);
                  }

                },
                // add hendler error
                error: function(model, response) {
                  //console.log(response);
                }
              }
            );
          }
        }

        return this;
      },

      hideModalWindow: function(){
        var me = this;
        $(this.el_modal).modal('hide');
        // Add new Work models to WorksCollection
        if (me.workModelsList != []){
          me.currenrWorksCollection.add(me.workModelsList);
        }
      },

      resetDataOfModalWindow: function(){
        document.getElementById(this.modal_form).reset();
      },

      closeModalWindow: function(){
        this.resetDataOfModalWindow();
        this.hideModalWindow();
      },

    });

    return TeacherAddWorkDialogView;
});