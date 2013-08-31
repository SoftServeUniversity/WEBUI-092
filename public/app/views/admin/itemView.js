define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/itemTemplate.html'

    
], function ($, _, Backbone, ItemTemplate) {   
  
	var ItemView = Backbone.View.extend({ 
	  
	  tagName: 'tr', 
	  
	  className: 'toggle-list',
	  
	  initialize: function(data){
	  	var me = this; 
	    this.data = data;
	    this.model.on("reset", this.updateView);
	  },

	  events: {
	    'click .delete-button' : 'test'
	  },

	  updateView: function(){
	    this.remove();
	  },

	  test: function(){
	  	alert('i never fire :(');
	  },

	  render: function(){
	  	this.data.model = this.data.model.toJSON();
	  	var compiledTemplate = _.template(ItemTemplate, this.data);
	    this.$el.html(compiledTemplate); 
	    return this;
	  }

	});

	return  ItemView;

});
