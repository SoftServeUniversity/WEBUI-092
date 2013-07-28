define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/group/oneColumnTemplate.html',
  'collections/tasks/TasksProxyCollection'],
   function($, _, Backbone, oneColumnTemplate, TasksProxyCollection){

    var StudentProgressView = Backbone.View.extend({
      el: $("#content"),

      render: function(){

        var that = this;

        var tasksCollection = new TasksProxyCollection();
            tasksCollection.fetch({
                url: "app/mocks/tasks.json",
                async:false
            });


        var data = {
          header: 'Тема роботи',
          subheader_1: 'Група',
          subheader_2: 'Керівник',
          subheader_3: 'Студент',
          entities: tasksCollection.models,
          _: _
        };
        var compiledTemplate = _.template( oneColumnTemplate, data);

        $("#content").html(compiledTemplate);
      }

    });

    return StudentProgressView;

  });