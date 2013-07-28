define([
  'jquery',
  'underscore',
  'backbone',
  'models/task/TaskProxyModel'
  ],
  function($, _, Backbone, TaskProxyModel)
  {
    var TasksCollection = Backbone.Collection.extend({
      model:TaskProxyModel
    });
    return TasksCollection;
  });
