define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/group/oneColumnTemplate.html',
  'collections/groups/GroupsCollection'],
   function($, _, Backbone, oneColumnTemplate, GroupsCollection){

    var CourseProgressView = Backbone.View.extend({
      el: $("#content"),

      render: function(){

        var that = this;

        var groupsCollection = new GroupsCollection();
            groupsCollection.fetch({
                url: "app/mocks/groups.json",
                async:false
            });


        var data = {
          header: 'Курс_1',
          subheader_1: 'Факультет',
          subheader_2: 'Декан',
          subheader_3: 'Рік випуску',
          entities: groupsCollection.models,
          _: _
        };
        var compiledTemplate = _.template( oneColumnTemplate, data);

        $("#content").html(compiledTemplate);
      }

    });

    return CourseProgressView;

  });