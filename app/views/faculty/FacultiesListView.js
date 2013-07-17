define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/faculty/facultiesListTemplate.html',
  'collections/faculties/FacultiesCollection'
], function($, _, Backbone, facultiesListTemplate, FacultiesCollection){

  var FacultiesListView = Backbone.View.extend({
    el: $("#content"),

    render: function(){

      var that = this;

      
      $('.menuBox li').removeClass('active');
      $('.menuBox li a[href="#"]').parent().addClass('active');


      var data_col = new FacultiesCollection();
      var data = {
        faculties: data_col.models,
        _: _       	
      }
      var compiledTemplate = _.template( facultiesListTemplate, data);
     
      $("#content").append(compiledTemplate);
    }

  });

  return FacultiesListView;
  
});