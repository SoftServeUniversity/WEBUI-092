define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FacultyModel = Backbone.Model.extend({
  	    defaults: {
  	    	id:1,
		    name:"Назва факультету",
		    num_students: 99,
		    num_groups: 99,
		    img:"i/faculties/8.png"
        }
  });

  return FacultyModel;

});