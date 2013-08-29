define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FacultyModel = Backbone.Model.extend({
  	    defaults: {
  	    	id:1,
		      name:"Назва факультету",
		      num_groups: 50, //caculate
          head: 1,
		      img:"i/faculties/8.png", //external
          progress: 0.2 //external
        },
  });

  return FacultyModel;

});