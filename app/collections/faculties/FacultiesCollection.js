define([
  'jquery',
  'underscore',
  'backbone',
<<<<<<< HEAD
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
=======
  'models/faculties/FacultyModel'
], function($, _, Backbone, FacultyModel){
	
  var FacultiesCollection = Backbone.Collection.extend({
  	model: FacultyModel,
  	url: "app/mocks/faculties.json"
  });
  
>>>>>>> 2cb217e218404e7ee4b1e88fedd6ca4a6fef6a2b
  return FacultiesCollection;
});
