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
	
	    this.faculties_col    = new FacultiesCollection();
	    this.changes_col = new FacultiesChangeCollection();

        $.when(this.faculties_col.fetch() && this.changes_col.fetch()).then(function(){
        	that.render();
        })
    },

    el: $("#content"),
    
    initialize : function(){
		this.loadData();
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