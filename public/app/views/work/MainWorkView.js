define([
  'jquery',
  'editinplace',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/work/WorkTasksTemplate.html',
  'text!templates/work/WorkHistoryTemplate.html',
  'text!templates/work/elementTemplate.html',
  'collections/work/WorkCollection',
  'collections/work/WorkHistoryCollection',
  'views/work/TasksListView',
  'models/work/WorkModel',
  'models/task/TaskModel',
  'collections/tasks/ProgressesCollection'


], 
function($, evil, _, Backbone, bootstrap, WorkTasksTemplate, 
        WorkHistoryTemplate, elementTemplate, WorkCollection, 
        WorkHistoryCollection, TasksListView, WorkModel, TaskModel, ProgressesCollection){
  
  var WorkTasksView = Backbone.View.extend({ 

    loadData: function(){
      var me = this;
      this.model = new WorkModel({"id": me.id});
      this.history_col = new WorkHistoryCollection();
      this.work_col = new WorkCollection();
      this.model.fetch({async:false});
      this.history_col.add(this.model.get('thesis_changes'));
      this.work_col.add(this.model.get('tasks'));
      _.each(this.work_col.models, function(task){
          me.history_col.add(task.get('thesis_changes'));
      });
      this.progresses = new ProgressesCollection()
      this.progresses.fetch({url: 'http://localhost:3000/work/' + me.id + '/tasks/progresses.json', async:false})
      me.render();

      console.log(this.work_col)
    },
    updatePriority: function (items) {
      var me = this;
      _.each(items, function (item) {
        var taskId = $(item).attr("task-id");
        var newPriority = ($(item).index()) + 1;
        var currentTask = me.work_col.get(taskId);
        currentTask.set("priority", newPriority);
        currentTask.save()
      });
    },
    initialize:function(){
      var me = this;
      this.loadData();
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

    events: {
      "click #create-btn"             : "addTask",
      "click #show-create-task-form"  : "showCreateTaskFrom",
      "click #edit-tasks-on-work-page": "editTasksOnWorkPage",
      "click #delete-task"            : "deleteTask"
    },

    addTask: function(e) {
      e.preventDefault();
      var me = this;
      var taskName = $("#task-name").val();
      var newTask = new TaskModel({name: taskName, priority: 0, work_id: this.id, user_id: 1});
      newTask.save();
    },
    showCreateTaskFrom: function () {
      $("#add-new-task").fadeToggle("slow", "linear");
      if($("#show-create-task-form").hasClass("active")){
        $("#show-create-task-form").removeClass("active");
      } else {
        $("#show-create-task-form").addClass("active");
      }
    },
    editTasksOnWorkPage: function () {
      if($("#list-of-tasks").hasClass("sortable")) {
        $(".sortable").sortable("destroy");
        $("#list-of-tasks").removeClass("sortable");
        $("#edit-tasks-on-work-page").removeClass("active");
      } else {
        $("#list-of-tasks").addClass("sortable");
        this.sortable();
        $("#edit-tasks-on-work-page").addClass("active");
      }
      $(".editable").fadeToggle("slow", "linear");

    },
    sortable: function () {
      var me = this;
      $(".sortable").sortable({ 
        stop: function(event, ui) {
          console.log(ui.item.index());
          var new_position = $(this).sortable();
          me.updatePriority( new_position.context.children)
        }
      });
      $(".sortable").disableSelection();
    },
    deleteTask: function (e) {
      var modelId = $(e.currentTarget).closest("li").attr("task-id") * 1;
      var currentModel = this.work_col.get(modelId);
      
      currentModel.destroy();
    }

  });

  return WorkTasksView;

});
