define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/group/oneColumnTemplate.html',
  'collections/groups/GroupsProxyCollection'],
   function($, _, Backbone, oneColumnTemplate, GroupsProxyCollection){

    var CourseProgressView = Backbone.View.extend({
      el: $("#content"),

      render: function(){

        var that = this;

        var groupsCollection = new GroupsProxyCollection();
        groupsCollection.fetch({
          //url: "/groups/",
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