define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var WorkTasksModel = Backbone.Model.extend({
    defaults: {
      "name": "Завдання", 
      "id": "001", 
      "percentage": "30",
      "workname": ""
    }
  });	

});