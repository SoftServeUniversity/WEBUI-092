define([
  'jquery',
  'underscore',
  'backbone',

  'views/admin/tabChildView',
  'models/course/CourseModel',
  'collections/courses/CoursesCollection',
  'collections/faculties/FacultiesCollection'


], function($, _, Backbone, TabChildView, CourseModel, CoursesCollection, FacultiesCollection){   
   
  var TabChildCoursesView = Backbone.View.extend({


    tagName: 'div',

    setConfig: function(){
      var config = {
      	model: CourseModel,
        col: this.courses_col,
        data: [{
            _link: 'name',
            label:'Course Name',
            type:'text'
          },
          {
            _link: 'year_of_start',
            label:'Year Of Start',
            type:'text'
          },
          {
            _link: 'faculty_id',
            label: 'Faculty Name',
            type:'select',
            src:this.faculties_col.toJSON()
          }
          /*,{
            _link: 'percentage',
            label: 'Percentage',
            type:'text',
          }*/
        ],
        buttons: {
        	create: 'New Course'
        }
      };
      
      return config;
    },
    
    loadData: function(){
      var that = this; 
      
      this.courses_col = new CoursesCollection();
      this.faculties_col = new FacultiesCollection();

      $.when(this.courses_col.fetch() /*&& this.faculties_col.fetch()*/).then(function(){
        that.trigger('onDataLoaded');
      })
    },


    initialize: function(){         
      var that = this;
      
      that.loadData();  
      this.on('onDataLoaded', function(){
      	that.config = that.setConfig();
      	that.childView = new TabChildView(that.config);
        that.render();
      });     
    },

    render: function (){
      var that=this;
        
      //console.log(that.childView.$el.html());
      var htmlContent = that.childView.$el.html()
      
      //when everything has loaded - trigger global event
      GlobalEventBus.trigger('tabChildSupViewLoaded', htmlContent, that.config);
      return this;
    }
  
  });
  
  return  TabChildCoursesView;
  
});