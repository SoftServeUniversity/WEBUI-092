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
  	
  	loadData: function (){
  		var that = this;
  		
  		var facs_col    = new FacultiesCollection();
		facs_col.fetch({success:function(){
			that.trigger('DataLoaded', 'Faculties', facs_col);
		}});
		
		var changes_col = new FacultiesChangeCollection();
		changes_col.fetch({success:function(){
			that.trigger('DataLoaded', 'FacultiesChanges', changes_col);		
		}});
  	},
    
    el: $("#content"),
    
    initialize : function(){
		var isFacLoaded, isFacChangesLoaded;

	    this.on('DataLoaded', function (item, data) {
	        if (item == 'Faculties') {
	        	isFacLoaded = true;
	        	this.facs_col = data;
	        }
	        if (item == 'FacultiesChanges'){
	        	isFacChangesLoaded = true;
	        	this.changes_col = data;
	        }
	        if (isFacLoaded && isFacChangesLoaded){
	        	this.render();
	        }
	    });
    },
    
    render: function(){
      
      var that = this;
        
        //add active class to menu item
        $('.menuBox li').removeClass('active');
        $('.menuBox li a[href="#"]').parent().addClass('active');
 
		var facs = that.facs_col.toJSON();
		var changes = that.changes_col.toJSON();

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