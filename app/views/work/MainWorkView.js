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

    loadData: function(){
      var that = this;

      work_col = new WorkCollection();
      history_col = new WorkHistoryCollection();
      $.when(work_col.fetch() && history_col.fetch()).then(function(){
        that.render();
      })
    },

    initialize:function(id){
      this.loadData();
      this.id = id;
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
      "click #create-btn"     : "addTask",
      "dblclick .taskname"    : "editTask"
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