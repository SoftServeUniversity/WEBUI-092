define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/faculty/facultiesListTemplate.html',
  'collections/faculties/FacultiesCollection',
  'collections/faculties/FacultiesChangeCollection'

], function($, _, Backbone, facultiesListTemplate, FacultiesCollection, FacultiesChangeCollection){

  var FacultiesListView = Backbone.View.extend({
    el: $("#content"),

    render: function(){

      var that = this;




      
      $('.menuBox li').removeClass('active');
      $('.menuBox li a[href="#"]').parent().addClass('active');
      




		var facs_col = new FacultiesCollection();
		var changes_col = new FacultiesChangeCollection();
		var facs = facs_col.toJSON();
		var changes = changes_col.toJSON();

		var facs_changes = _.map(facs, function (fac) {  
		    var change = _.find(changes, function (o) { 
		        return o.id == fac.id;
		    }); 
		    return _.extend(fac, change); 
		});	
		
		var facs_changes = new Backbone.Collection(facs_changes);	
		var data = {
		  faculties: facs_changes.models,
		    _: _       	
		}
		var compiledTemplate = _.template( facultiesListTemplate, data);
		 
		$("#content").append(compiledTemplate);
    }

  });

  return FacultiesListView;
  
});