define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	
  var Test = [
	{
		"id":1,
	    "progress":"0.9",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":2,
	    "progress":"0.6",
	    "created_at":"19 08 2011",
	    "updated_at": "22 08 2011"
	
	},
	{
		"id":3,
	    "progress":"0.3",
	    "created_at":"19 08 2010",
	    "updated_at": "22 08 2010"
	
	},
	{
		"id":4,
	    "progress":"0.1",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":5,
	    "progress":"0.5",
	    "created_at":"19 08 2010",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":6,
	    "progress":"0.3",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":7,
	    "progress":"0.7",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":8,
	    "progress":"0.5",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":9,
	    "progress":"0.6",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":10,
	    "progress":"0.4",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	},
	{
		"id":11,
	    "progress":"0.6",
	    "created_at":"19 08 2013",
	    "updated_at": "22 08 2013"
	
	}
];
	

  var FacultiesChangeCollection = function(){
  	return new Backbone.Collection(Test);
  }
  return FacultiesChangeCollection;
});
