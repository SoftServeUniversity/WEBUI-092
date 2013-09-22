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
        'click #changebtn'        : 'showModal',
        'submit #input-log'       : 'submit',
        'keypress #task-comment'  : 'validateComment',
      },
      showModal: function(){
        $('#change').modal('show');
        var commentTextArea = $('#task-comment');
        if(commentTextArea.val().length < 10) {
          commentTextArea.parent().addClass('control-group error');
          $(".modal-footer>input[type=submit]").hide();
        }
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
        console.log(this.collection)
      },
      submit: function(e){
        e.preventDefault();
        var newCommentContent = $(e.currentTarget).find('textarea').val();
        var newTaskProcess = $(e.currentTarget).find('#number-range').val();
        this.addNewProgress(newTaskProcess);
        this.addCommentToCollection(this.user, newCommentContent);
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
        console.log(newCommentModel)
        newCommentModel.save();
      },
      slider: function(){
        var numberRange = $("#number-range");
        numberRange.spinner({min: 0, max: 100});
        numberRange.spinner("value", this.progress.get('progress'));
        numberRange.spinner({
          spin: function(){
            $("#line-range").slider({value: numberRange.spinner("value")})
          },
          change: function(){
            $("#line-range").slider({value: numberRange.spinner("value")})
          }
        })
        $("#line-range").slider({ min: 0, max: 100, range: 100, value: this.progress.get('progress'),
          slide: function(){
            numberRange.spinner("value", $("#line-range").slider("value"));
          },
          change: function(){
            numberRange.spinner("value", $("#line-range").slider("value"));
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
              makeChart(chartData);
            }
          }
        }
        xmlhttp.send(null);
        function makeChart(chartData){
          $('#chart').highcharts({
            title: {
              text: 'Графік виконання завдання'
            },
            tooltip: {
              formatter: function() {
                return  'Прогрес: '+ this.y + '%';
              }
            },
            legend: {
              enabled: false
            },
            yAxis: {
              title: {
                text: 'Прогрес, %'
              },
              tickInterval: 10,
              max: 100,
              min: 0
            },
            xAxis: {
              categories: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень','Жовтень', 'Листопад', 'Грудень',]
            },
            series: [{
              data: chartData
            }]
          });
        }
      },
      validateComment: function () {
        var commentArea = $('#task-comment'), submitButton = $(".modal-footer>input[type=submit]");
        if (commentArea.val().length < 10){
          commentArea.parent().addClass('control-group error');
          submitButton.hide();
        } else {
          commentArea.parent().removeClass('control-group error');
          submitButton.fadeIn();
        }
      },
      checkScroll: function () {
        // is it low enough to add elements to bottom?
        var pageHeight = Math.max(document.body.scrollHeight ||
          document.body.offsetHeight);
        var viewportHeight = window.innerHeight  ||
          document.documentElement.clientHeight  ||
          document.body.clientHeight || 0;
        var scrollHeight = window.pageYOffset ||
          document.documentElement.scrollTop  ||
          document.body.scrollTop || 0;
        // Trigger for scrolls within 20 pixels from page bottom
        return pageHeight - viewportHeight - scrollHeight < 40;
      },
      getPage: function () {
        this.page++;
        return this.page
      },
      loadNewPage: function () {
        var newData = new CommentsCollection();
        this.getPage()
        var newPageUrl = "/task_changes/" + this.id + "?page=" + this.page
        newData.fetch({url: newPageUrl, async:false});
        if (newData.length < 10) {
          $(document).off( "scroll" );
        }
        if (newData.length > 0) {
          var compiledComments = new taskCommentsView({"collection": newData});
          $("#comments").append(compiledComments.$el.html());
        }
      },
      initialize: function(){
        this.page = 0;
        var me = this;
        GlobalUser.currentUser? console.log('Works'):console.log('sucks');
        this.user = 1;
        this.undelegateEvents();
        this.delegateEvents(this.events);
        $(document).on("scroll", function () {
          if(me.checkScroll()){
            me.loadNewPage();
          }
        });
        this.loadData();
      },
       loadData: function () {
        var me = this;
        var progressUrl = "/tasks/" + this.id + "/task_progress/", 
            changesUrl = "/task_changes/" + this.id + "?page=" + me.page;
        this.model = new TaskModel({"id": me.id});
        this.progress = new ProgressModel();
        this.model.fetch({async:false});
        this.progress.fetch({url: progressUrl, async: false})
        this.collection.fetch({url: changesUrl, async:false});
        this.render();
      }
    });

return TaskView;

});