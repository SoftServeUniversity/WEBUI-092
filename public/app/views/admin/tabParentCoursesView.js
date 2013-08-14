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
        ],
        buttons: {
          create: 'New Course'
        }
      };
      
      return config;
    },
    
    loadData: function(){
      var that = this; 
      this.courses_col ='';
      this.faculties_col = '';
      this.courses_col = new CoursesCollection();
      this.faculties_col = new FacultiesCollection();
      
      this.courses_col.fetch({success: function() {
        that.trigger('onDataLoaded', 'Courses');
      }})
      this.faculties_col.fetch({success: function() {
        that.trigger('onDataLoaded', 'Faculties');
      }})

    },


    initialize: function(){         
      var that = this;
      var courses = false;
      var faculties = false; 
      
      this.on('onDataLoaded', function(flag){
 
        if (flag == 'Courses') {
          courses = true;
        }
        if (flag == 'Faculties') {
          faculties = true;
        }         
        if ((courses == true) && (faculties == true)){
          that.config = that.setConfig();
          that.childView = new TabChildView(that.config);
          that.render();
        }
      });  
      
      that.loadData();   
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