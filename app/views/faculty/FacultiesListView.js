define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/faculty/facultiesListTemplate.html',
  'collections/faculties/FacultiesCollection',
  'collections/faculties/FacultiesChangeCollection',
  'libs/jquery/equal-height-blocks'
], function($, _, Backbone, facultiesListTemplate, FacultiesCollection, FacultiesChangeCollection, equalizeHeight){


  var FacultiesListView = Backbone.View.extend({

    loadData: function (){
	    var that = this;
	
	    var faculties_col    = new FacultiesCollection();
	    faculties_col.fetch({success:function(){
	      that.trigger('DataLoaded', 'Faculties', faculties_col);
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
			  this.faculties_col = data;
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
	
	    var faculties = that.faculties_col.toJSON();
	    var changes = that.changes_col.toJSON();
	
	    var faculties_changes = _.map(faculties, function (faculty) {
	        var change = _.find(changes, function (o) {
	            return o.id == faculty.id;
	        });
	        return _.extend(faculty, change);
	    });
	
	    var faculties_changes = new Backbone.Collection(faculties_changes);
	    var data = {
	      faculties: faculties_changes.models,
	        _: _
	    }
	    var compiledTemplate = _.template( facultiesListTemplate, data);
	
	    $("#content").html(compiledTemplate);
        
        //this script is making all boxes in a row equal hight
        resizeEqual(); 
    }

  });

  return FacultiesListView;

});