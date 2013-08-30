define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/tabHeadTemplate.html'

], function ($, _, Backbone, TabHeadTemplate) {   
  
var TabHeadView = Backbone.View.extend({ 
  
  tagName: 'tr', 
  
  className: 'table-head',
  
  initialize: function(data){
    this.data = data;

  },
  
  render: function(){
  	var compiledTemplate = _.template(TabHeadTemplate, this.data);
    this.$el.html(compiledTemplate); 
    return this;
  }

});

return  TabHeadView;

});