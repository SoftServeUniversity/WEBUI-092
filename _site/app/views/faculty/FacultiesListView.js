define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/faculty/facultiesListTemplate.html',
  'collections/faculties/FacultiesCollection',
  'collections/faculties/FacultiesChangeCollection',
  'libs/jquery/equal-height-blocks'

], function($, _, Backbone, facultiesListTemplate, FacultiesCollection, FacultiesChangeCollection){

  var FacultiesListView = Backbone.View.extend({
    el: $("#content"),

    render: function(){

      var that = this;




      
      $('.menuBox li').removeClass('active');
      $('.menuBox li a[href="#"]').parent().addClass('active');
      

		var facs_col = new FacultiesCollection();
		facs_col.fetch({ url: "app/collections/faculties/facultiesCollection.json", async:false, success: function() {
		    console.log(facs_col);    
		}});
		
		var changes_col = new FacultiesChangeCollection();
		changes_col.fetch({ url: "app/collections/faculties/facultiesChangeCollection.json", async:false, success: function() {
		    console.log(changes_col);  
		}});		
		
		
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