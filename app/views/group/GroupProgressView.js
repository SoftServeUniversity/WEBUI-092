define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/group/oneColumnTemplate.html',
  'collections/students/StudentsCollection'],
   function($, _, Backbone, oneColumnTemplate, StudentsCollection){

    var GroupProgressView = Backbone.View.extend({
      el: $("#content"),

      render: function(){

        var that = this;

        var studentsCollection = new StudentsCollection();
            studentsCollection.fetch({
                url: "app/mocks/students.json",
                async:false
            });

        var data = {
          header: 'Група_1',
          subheader_1: 'Факультет',
          subheader_2: 'Курс',
          subheader_3: 'Куратор',
          entities: studentsCollection.models,
          _: _
        };
        var compiledTemplate = _.template( oneColumnTemplate, data);

        $("#content").html(compiledTemplate);
      }

    });

    return GroupProgressView;

  });