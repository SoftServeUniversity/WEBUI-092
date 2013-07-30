define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var WorkTasksModel = Backbone.Model.extend({
    defaults: {
      "name": "Завдання", 
      "id": 1, 
      "percentage": null,
      "workname": ""
    }
  }); 

  return WorkTasksModel;
  
});