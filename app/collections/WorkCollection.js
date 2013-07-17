define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	
 var WorkTasks = [
  {
      "name": "Завдання", 
      "id": "001", 
      "percentage": "30"
  },
  {
      "name": "Завдання", 
      "id": "002", 
      "percentage": "35"
  },
  {
      "name": "Завдання", 
      "id": "003", 
      "percentage": "40"
  },
  {
      "name": "Завдання", 
      "id": "004", 
      "percentage": "45"
  },
  {
      "name": "Завдання", 
      "id": "005", 
      "percentage": "50"
  },
  {
      "name": "Завдання", 
      "id": "006", 
      "percentage": "55"
  },
  {
      "name": "Завдання", 
      "id": "007", 
      "percentage": "60"
  },
  {
      "name": "Завдання", 
      "id": "008", 
      "percentage": "65"
  },
  {
      "name": "Завдання", 
      "id": "009", 
      "percentage": "70"
  },
  {
      "name": "Завдання", 
      "id": "0010", 
      "percentage": "75"
  }
  
]	
  var WorkCollection = function(){
  	return new Backbone.Collection(WorkTasks);
  }
  return WorkCollection;
});
