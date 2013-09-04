define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'jqueryui',
  'text!templates/task/taskTemplate.html',
  'views/task/taskCommentsView',
  'collections/tasks/CommentsCollection',
  'models/task/commentModel',
  'models/task/TaskModel',
  'models/task/ProgressModel'
  ], 
  function($, _, Backbone, bootstrap, jqueryui, taskTemplate, taskCommentsView, 
          CommentsCollection, commentModel, TaskModel, ProgressModel){
      var TaskView = Backbone.View.extend({
      el: $("#content"),
      collection: new CommentsCollection(),
      events: {
        'click #changebtn': 'showModal',
        'submit #input-log': 'submit'
      },
      showModal: function(){
        $('#change').modal('show');
      },
      closeModal: function(){
        $('#change').modal('hide');
      },
      render: function(){
        var compiledComments = new taskCommentsView({"collection": this.collection});
        var data = {
          comments: compiledComments.$el.html(),
          task: this.model,
          progress: this.progress,
          _: _         
        }
        var compiledTemplate = _.template(taskTemplate, data);
        $("#content").html(compiledTemplate);
        this.slider();
        this.chart();
      },
      submit: function(e){
        e.preventDefault();
        var newCommentContent = $(e.currentTarget).find('textarea').val();
        var newTaskProcess = $(e.currentTarget).find('#number-range').val();
        this.addNewProgress(newTaskProcess);
        this.addCommentToCollection(3, newCommentContent);
        this.closeModal();
        this.initialize();
      },
      addNewProgress: function (newProgress) {
        var progressModel = new ProgressModel({"progress": newProgress, "task_id": this.id});
        progressModel.save({patch: true});
      },
      addCommentToCollection: function(author, content){
        var newCommentModel = new commentModel({
          "user_id": author,
          "task_comment": content,
          "task_id": this.model.get("id")
        });
        newCommentModel.save();
        console.log(newCommentModel.get("id"))
      },
      slider: function(){
        $("#number-range").spinner({min: 0, max: 100});
        $("#number-range").spinner("value", this.progress.get('progress'));
        $("#number-range").spinner({
          spin: function(){
            $("#line-range").slider({value: $("#number-range").spinner("value")})
          },
          change: function(){
            $("#line-range").slider({value: $("#number-range").spinner("value")})
          }
        })
        $("#line-range").slider({ min: 0, max: 100, range: 100, value: this.progress.get('progress'),
          slide: function(){
            $("#number-range").spinner("value", $("#line-range").slider("value"));
          },
          change: function(){
            $("#number-range").spinner("value", $("#line-range").slider("value"));
          }
        });
      },
      chart: function () {
        var chartData;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/progresses_by_month/' + this.id + '.json', true);
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
              chartData = JSON.parse(xmlhttp.responseText);
              console.log(chartData)
              makeChart(chartData);
            }
          }
        };
        xmlhttp.send(null);
        function makeChart(chartData){
          $('#chart').highcharts({
              
              tooltip: {
                  pointFormat: "Прогрес: {point.y:,.1f}%"
              },
              
              xAxis: {
                  type: 'datetime',
                  labels: {
                      format: '{value:%Y-%m-%d}',
                      rotation: 45,
                      align: 'left'
                  }
              },

              series: [{
                  data: chartData,
                  pointStart: Date.UTC(2013, 10, 1),
                  pointEnd: Date.UTC(2014, 6, 1),
                  pointInterval: 30.375 * 24 * 36e5
              }]

          });
        }
      },
      initialize: function(){
        this.undelegateEvents();
        this.delegateEvents(this.events);
        var me = this;
        this.model = new TaskModel({"id": me.id});
        this.model.fetch({async:false})
        this.progress = new ProgressModel()
        this.progress.fetch({url: "http://localhost:3000/tasks/" + me.id + "/task_progress.json", async: false})
        this.collection.fetch({url: "http://localhost:3000/task_changes/" + me.id + ".json", async:false, success: function () { return true }});
        this.render()
      }
      });

      return TaskView;

      });