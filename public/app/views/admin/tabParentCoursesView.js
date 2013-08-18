define([
  'jquery',
  'underscore',
  'backbone',

  'views/admin/tabChildView',
  'models/course/CourseModel',
  'collections/courses/CoursesCollection',
  'collections/faculties/FacultiesCollection'


], function($, _, Backbone, TabChildView, CourseModel, CoursesCollection, FacultiesCollection){   
   
  var TabChildCoursesView = TabChildView.extend({

    collections_classes: {
      courses: CoursesCollection,
      faculties: FacultiesCollection
    },

    setConfig: function(){
      var me = this; 
      
      config = {

        model: CourseModel,
        col: me.collections.courses,
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
            src: me.collections.faculties
          }
        ],

        buttons: {
          create: 'New Course'
        }
      };

      return config;
    },

    initialize: function(){ 
      var me = this;

      //call parent's initialize method passing tab configuration
      this.constructor.__super__.initialize.apply(this);
    
      //extend inherited events with own events
      _.extend(this.events, this.events_own)

    },
  });
  
  return  TabChildCoursesView; 
});