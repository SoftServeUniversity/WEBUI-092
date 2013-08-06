define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/shared/menuTemplate.html'
], function($, _, Backbone, menuTemplate) {
	
  var MenuView = Backbone.View.extend({
   	
    collection : null,
    
    tagName: 'div',

    initialize: function(data) {
      this.data = {
      	items:data
      };
      this.render();
      
    },
    setActive: function(id){
    	$(id).addClass('active');
    },

    render: function() {
    	var that = this; 
    	var compiledTemplate = _.template(menuTemplate, this.data);
    	this.$el.html(compiledTemplate);
    	
	    return this;  
    }
  });

  return MenuView;
});
