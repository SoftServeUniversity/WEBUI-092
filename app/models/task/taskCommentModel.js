define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var taskCommentModel = Backbone.Model.extend({
	defaults: {
	    "id": Math.round(Math.random()*10e10),
	    "author": "Teacher",
	    "date": 36,
	    "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, fugit modi blanditiis sunt libero delectus laborum sit quas. Quibusdam, hic, unde maiores blanditiis non recusandae quo excepturi delectus voluptates sint."
	}
  });

  return taskCommentModel;

});