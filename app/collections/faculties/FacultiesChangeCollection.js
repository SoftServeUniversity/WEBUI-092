define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	
  var Test = [
	{
		"id":1,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":2,
	    "progress":"60",
	    "created_at":"19 08 2011",
	    "updated_at": "22 08 2011"
	
	},
	{
		"id":3,
	    "progress":"30",
	    "created_at":"19 08 2010",
	    "updated_at": "22 08 2010"
	
	},
	{
		"id":4,
	    "progress":"10",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":5,
	    "progress":"80",
	    "created_at":"19 08 2010",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":6,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":7,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":8,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":9,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":10,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":11,
	    "progress":"90",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	}
];
	

  var FacultiesChangeCollection = function(){
  	return new Backbone.Collection(Test);
  }
  return FacultiesChangeCollection;
});
