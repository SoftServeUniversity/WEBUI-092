define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/group/oneColumnTemplate.html',
  'collections/students/StudentsProxyCollection'],
   function($, _, Backbone, oneColumnTemplate, StudentsProxyCollection){

    var TeacherProgressView = Backbone.View.extend({
      el: $("#content"),

      render: function(){

        var that = this;

        var studentsCollection = new StudentsProxyCollection();
            studentsCollection.fetch({
                url: "app/mocks/students.json",
                async:false
            });


        var data = {
          header: 'Викладач',
          subheader_1: 'Факультет',
          subheader_2: 'Кафедра',
          subheader_3: 'Завідуючий кафедрою',
          entities: studentsCollection.models,
          _: _
        };
        var compiledTemplate = _.template( oneColumnTemplate, data);

        $("#content").html(compiledTemplate);
      }

    });

    return TeacherProgressView;

  });