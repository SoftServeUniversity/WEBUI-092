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
      this.model.fetch({async:false})
      this.work_col = new WorkCollection();
      history_col = new WorkHistoryCollection();
      this.progresses = new ProgressesCollection()
      this.progresses.fetch({url: 'http://localhost:3000/work/' + me.id + '/tasks/progresses.json', async:false})
      // console.log(this.progresses)
      $.when(this.work_col.fetch({url: "http://localhost:3000/work/" + me.id + "/tasks.json", async:false}) && history_col.fetch({async:false})).then(function(){
        me.render();
      })
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
      // console.log(this.work_col.toJSON())
    },
    initialize:function(){
      var me = this;
      this.loadData();
      $( "#sortable" ).sortable({ 
        // revert: true,
        stop: function(event, ui) {
          console.log(ui.item.index());
          var new_position = $(this).sortable();
          me.updatePriority( new_position.context.children)
        }
     });
      $( "#sortable" ).disableSelection();

    },

    el: $("#content"),

    render: function(){
      var tasksListView = new TasksListView({
        collection: this.work_col,
        taskProgresses: this.progresses
      });

      var data = {
        work: this.model,
        // workname: "Чисельне ровязування динамічних багатозначних задач різноманітними \
        // методами сучасної науки",
        // studentname: "Корнелій Васильович Джміль",
        // teachername: "Тиміш Сергій Вікторович, канд. ф-м. н., доцент кафедри інформаційних \
        // систем",
        tasksList: tasksListView.render().$el.html()
      }
      var historydata = {
        historymodal: history_col.models
      }

      var workTemplate = _.template(WorkTasksTemplate, data);
      var historyTemplate = _.template(WorkHistoryTemplate, historydata);

      $("#content").html(workTemplate);
      $("#content").append(historyTemplate); 

    },

    events: {
      "click #create-btn" : "addTask"
    },

    addTask: function(e) {
      e.preventDefault();
      var me = this;
      var taskName = $("#task-name").val();
      var newTask = new TaskModel({name: taskName, priority: 0, work_id: this.id, user_id: 1});
      newTask.save();
      
    }

  });

  return WorkTasksView;

});