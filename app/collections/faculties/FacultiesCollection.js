define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

  var Test = [
	{
	    "name":"Факультет_1",
	    "num_students": 99,
	    "num_groups": 66

	},
	{
	    "name":"Факультет_2",
	    "num_students": 81,
	    "num_groups": 53

	},
	{
	    "name":".Факультет_3",
	    "num_students": 90,
	    "num_groups": 40

	},
	{
	    "name":"Факультет_4",
	    "num_students": 58,
	    "num_groups": 41

	},
	{
	    "name":"Факультет_5",
	    "num_students": 66,
	    "num_groups": 1

	},
	{
	    "name":"Факультет_6",
	    "num_students": 63,
	    "num_groups": 6

	},
	{
	    "name":"Faculty_1",
	    "num_students": 99,
	    "num_groups": 66

	},
	{
	    "name":"Faculty_1",
	    "num_students": 99,
	    "num_groups": 66

	},
	{
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
