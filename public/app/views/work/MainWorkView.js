define([
  'jquery',
  'editinplace',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/work/WorkTasksTemplate.html',
  'text!templates/work/WorkHistoryTemplate.html',
  'text!templates/work/elementTemplate.html',
  'collections/tasks/TasksCollection',
  'collections/work/WorkHistoryCollection',
  'views/work/TasksListView',
  'models/work/WorkModel',
  'models/task/TaskModel',
  'collections/tasks/ProgressesCollection',
  'views/shared/EditDialogView',
  'views/shared/EditTaskDialogueView',
  'text!templates/work/ControlsTemplate.html',
  'text!templates/work/AddTaskFormTemplate.html',
], 
function($, evil, _, Backbone, bootstrap, WorkTasksTemplate, 
        WorkHistoryTemplate, elementTemplate, TasksCollection, 
        WorkHistoryCollection, TasksListView, WorkModel, TaskModel,
         ProgressesCollection, EditDialogView, EditTaskDialogView,
         ControlsTemplate, AddTaskFormTemplate){
  var WorkTasksView = Backbone.View.extend({ 
    events: {
      "click #create-btn"             : "addTask",
      "click #show-create-task-form"  : "showCreateTaskFrom",
      "click #edit-tasks-on-work-page": "editTasksOnWorkPage",
      "click #delete-task"            : "deleteTask",
      "click #edit_name"              : "editName",
      "click #edit-task"              : "editTask"
    },
    loadData: function(){
      var me = this;
      this.model = new WorkModel({"id": me.id});
      this.history_col = new WorkHistoryCollection();
      this.model.fetch({async:false});
      this.history_col.add(this.model.get('thesis_changes'));
      this.work_col = new TasksCollection(this.model.get('tasks'));
      _.each(this.work_col.models, function(task){
          me.history_col.add(task.get('thesis_changes'));
          task.unset('thesis_changes');
      });
      _.each(this.history_col.models, function(element){
         element.set('date', new Date(element.get('created_at')).toLocaleString());
      });
      this.progresses = new ProgressesCollection()
      this.progresses.fetch({url: '/work/' + me.id + '/tasks/progresses.json', async:false})
      me.render();
      if (GlobalUser.currentUser){
        if (GlobalUser.currentUser.id == this.model.get('ability_to_change')) {
          this.addControls()
        }
      } else {
        $("#controls").remove();
      }
    },
    addControls: function () {
      $("#controls").html(ControlsTemplate);
      $("#add-new-task").html(AddTaskFormTemplate);
    },
    updatePriority: function (items) {
      var me = this;
      _.each(items, function (item) {
        var taskId = $(item).attr("task-id");
        var newPriority = ($(item).index()) + 1;
        var currentTask = me.work_col.get(taskId);
        console.log(taskId)
        currentTask.set("priority", newPriority);
        currentTask.save({patch: true})
      });
    },
    initialize: function(){
      var me = this;
      this.loadData();
      this.model.on('change', function(){
        me.renderWorkName();
      });
      $( "#sortable" ).sortable({ 
        stop: function(event, ui) {
          console.log(ui.item.index());
          var new_position = $(this).sortable();
          me.updatePriority( new_position.context.children)
        }
     });
      $("#sortable").disableSelection();
    },
    el: $("#content"),
    render: function(){
      var tasksListView = new TasksListView({
        collection: this.work_col,
        taskProgresses: this.progresses
      });
      var data = {
        work: this.model,
        tasksList: tasksListView.render().$el.html()
      }
      var historydata = {
        historymodal: this.history_col.models
      }
      var workTemplate = _.template(WorkTasksTemplate, data);
      var historyTemplate = _.template(WorkHistoryTemplate, historydata);
      $("#content").html(workTemplate);
      $("#content").append(historyTemplate); 
      $(".editable").hide();
    },
    renderWorkName: function(){
      this.$('#work_name').html(this.model.get('name'));
    },
    addTask: function(e) {
      e.preventDefault();
      var me = this;
      var taskName = $("#task-name").val();
      var newTask = new TaskModel({name: taskName, priority: 0, work_id: this.id, user_id: 1});
      this.work_col.add(newTask);
      newTask.save({}, {
        success: function () {
          me.loadData();
          $("#add-new-task").show();
          $("#show-create-task-form").addClass("btn-warning");
        }
      });
    },
    showCreateTaskFrom: function () {
      $("#add-new-task").fadeToggle("slow", "linear");
      var createTaskForm = $("#show-create-task-form");
      if(createTaskForm.hasClass("btn-warning")){
        createTaskForm.removeClass("btn-warning");
        createTaskForm.addClass("btn-info");
      } else {
        createTaskForm.addClass("btn-warning");
        createTaskForm.removeClass("btn-info");
     }
    },
    editTasksOnWorkPage: function () {
      var listofTasks = $("#list-of-tasks");
      if(listofTasks.hasClass("sortable")) {
        $(".sortable").sortable("destroy");
        listofTasks.removeClass("sortable");
        $("#edit-tasks-on-work-page").removeClass("btn-warning");
        $("#edit-tasks-on-work-page").addClass("btn-info");
      } else {
        listofTasks.addClass("sortable");
        this.sortable();
      $("#edit-tasks-on-work-page").removeClass("btn-info");
      $("#edit-tasks-on-work-page").addClass("btn-warning");
      }
      $(".editable").fadeToggle("slow", "linear");
    },
    sortable: function () {
      var me = this;
      var sortable = $(".sortable");
      sortable.sortable({ 
        stop: function(event, ui) {
          console.log(ui.item.index());
          var new_position = $(this).sortable();
          me.updatePriority( new_position.context.children);
        }
      });
      sortable.disableSelection();
    },
    deleteTask: function (e) {
      var modelId = $(e.currentTarget).closest("li").attr("task-id") * 1;
      var currentModel = this.work_col.get(modelId);
      currentModel.destroy({success: function () {
        $("li[task-id=" + modelId + "]").fadeOut()
      }});
    },
    editName: function(){
      var editDialogView = new EditDialogView({model: this.model});
    },
    editTask: function (e) {
      var currentLi = $(e.currentTarget).closest("li");
      var modelId = currentLi.attr("task-id") * 1;
      var currentModel = this.work_col.get(modelId);  
      var editTaskDialogView = new EditTaskDialogView({model: currentModel, taskElement: currentLi});
    }
  });

  return WorkTasksView;
});