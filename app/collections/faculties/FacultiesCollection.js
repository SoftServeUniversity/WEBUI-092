define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	
  var Test = [
	{
		"id": 1,
	    "name":"Факультет_1",
	    "num_students": 99,
	    "num_groups": 66
	
	},
	{
		"id": 2,
	    "name":"Факультет_2",
	    "num_students": 81,
	    "num_groups": 53
	
	},
	{
		"id": 3,
	    "name":".Факультет_3",
	    "num_students": 90,
	    "num_groups": 40
	
	},
	{
		"id": 4,
	    "name":"Факультет_4",
	    "num_students": 58,
	    "num_groups": 41
	
	},
	{
		"id": 5,
	    "name":"Факультет_5",
	    "num_students": 66,
	    "num_groups": 1
	
	},
	{
		"id": 6,
	    "name":"Факультет_6",
	    "num_students": 63,
	    "num_groups": 6
	
	},
	{
		"id": 7,
	    "name":"Faculty_1",
	    "num_students": 99,
	    "num_groups": 66
	
	},
	{
		"id": 8,
	    "name":"Faculty_1",
	    "num_students": 99,
	    "num_groups": 66
	
	},
	{
		"id": 9,
	    "name":"Faculty_1",
	    "num_students": 99,
	    "num_groups": 66
	
	}
];
	

  var FacultiesCollection = function(){
  	return new Backbone.Collection(Test);
  }
  return FacultiesCollection;
});
