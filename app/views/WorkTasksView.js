define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/WorkTasksTemplate.html',
  'collections/WorkCollection'
], function($, _, Backbone, WorkTasksTemplate, WorkCollection){

  var WorkTasksView = Backbone.View.extend({
    el: $("#content"),

    render: function(){
      var data_col = new WorkCollection();

      var data = {
        worktasks: data_col.models,
        _: _        
      }

      var compiledTemplate = _.template(WorkTasksTemplate, data);
     
      $("#content").html(compiledTemplate);
    }

  });

  return WorkTasksView;
  
});