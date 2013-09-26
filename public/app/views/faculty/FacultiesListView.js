define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/faculty/facultiesListTemplate.html',
  'collections/faculties/FacultiesCollection',
  'collections/faculties/FacultiesChangeCollection',
  'libs/jquery/equal-height-blocks'

], function($, _, Backbone, facultiesListTemplate, FacultiesCollection, FacultiesChangeCollection , HeightEqualizer){

  var FacultiesListView = Backbone.View.extend({

    el: $("#content"), 
    
    initialize : function(){
      
      this.loadData();
      
      var facultiesLoaded = false;

      this.on("dataLoaded", function (flag) {
        if (flag == 'Faculties') {
          facultiesLoaded = true;
        }
        if (facultiesLoaded) {
          this.render();
        }
      })

    },

    //load collections asyncrounously
    loadData: function (){
      
      var me = this;
    
      this.faculties_col  = new FacultiesCollection();

      this.faculties_col.fetch({ success: function () {
          me.trigger('dataLoaded', 'Faculties')
        }
      })

    },

    render: function(){

      var me = this;
    
      //add active class to menu item
      $('.menuBox li').removeClass('active');
      $('.menuBox li a[href="#"]').parent().addClass('active');

      var compiledTemplate = _.template( facultiesListTemplate,  { faculties: me.faculties_col.models });
    
      $("#content").html(compiledTemplate);
      
      //make equal height of faculty blocks in each row
      HeightEqualizer.resizeEqual(); 
    
    }

  });

  return FacultiesListView;

});