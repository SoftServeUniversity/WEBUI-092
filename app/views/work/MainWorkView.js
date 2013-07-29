define([
  'jquery',
  'editinplace',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/work/WorkTasksTemplate.html',
  'text!templates/work/WorkHistoryTemplate.html',
  'text!templates/work/elementTemplate.html',
  'text!templates/work/historyTemplate.html',
  'collections/work/WorkCollection',
  'collections/work/WorkHistoryCollection',
  'views/work/TasksListView',
  'views/work/HistoryListView'
], 
function($, evil, _, Backbone, bootstrap, WorkTasksTemplate, WorkHistoryTemplate, elementTemplate, historyTemplate, WorkCollection, WorkHistoryCollection, TasksListView, HistoryListView){
  
  var WorkTasksView = Backbone.View.extend({ 

    loadData: function(id){
      workId = id;
      var that = this;

      work_col = new WorkCollection();
      work_col.fetch({
        success: function () {
          that.trigger('DataLoaded', 'Work', work_col);
        }
      });

      history_col = new WorkHistoryCollection();
      history_col.fetch({
        success:function () {
          that.trigger('DataLoaded', 'History', history_col);
        }
      });
    },

    initialize:function(){
      var isWorkLoaded = false;
      var isHistoryLoaded = false;

      var that = this;

      this.on('DataLoaded', function (item) {
        if (item == 'Work') {
          isWorkLoaded = true;
        }
        if (item == 'History'){
          isHistoryLoaded = true;
        }
        if ((isWorkLoaded && isHistoryLoaded) == true){
          that.render();
        }
      });
    },

    el: $("#content"),

    render: function(){

      var tasksListView = new TasksListView({
        collection:work_col,
        linkTo:"work"
      });

      var data = {
        workname: "Чисельне ровязування динамічних багатозначних задач різноманітними методами сучасної науки",
        studentname: "Корнелій Васильович Джміль",
        teachername: "Тиміш Сергій Вікторович, канд. ф-м. н., доцент кафедри інформаційних систем",
        tasksList : tasksListView.render().$el.html()
      }

      var historyListView = new HistoryListView({
        collection:history_col
      });

      var historydata = {
        historyList : historyListView.render().$el.html()
      }

      var workTemplate = _.template(WorkTasksTemplate, data);
      var historyTemplate = _.template(WorkHistoryTemplate, historydata);

      $("#content").html(workTemplate);
      $("#content").append(historyTemplate); 

      // Edit Tasks
      $(".taskname").editInPlace({
        url: "app/mocks/work/worktasks.json",
        callback: function(original_element, html){
          return(html);
        }
      });
      // End Edit Task
    },

    events: {
      "click .history-modal"  : "showHistory",
      "click #create-btn"     : "addTask",
      "dblclick .taskname"    : "editTask"
    },

    showHistory: function(e){
      e.preventDefault();
      $('#myModal').show();
    },

    addTask: function(e) {
      e.preventDefault();
      var newWorkTaskModel = {
        "name": "Завдання", 
        "id": 1, 
        "percentage": 0 
      }
        console.log(newWorkTaskModel);
      work_col.unshift(newWorkTaskModel);
    },

    editTask: function(e) {
      e.preventDefault();
    },

  });

  return WorkTasksView;

});