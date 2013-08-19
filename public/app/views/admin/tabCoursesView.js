define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/course/CourseModel',
  'collections/courses/CoursesCollection',
  'collections/faculties/FacultiesCollection'

], function($, _, Backbone, ParentTabView, CourseModel, CoursesCollection,
            FacultiesCollection){   
   
  var TabChildCoursesView = ParentTabView.extend({

    collections_classes: {
      courses: CoursesCollection,
      faculties: FacultiesCollection
    },

    //runs when all collections have loaded
    setConfig: function(){
      var me = this; 
      
      config = {

        model: CourseModel,
        collection: me.collections.courses,
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
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    },

  });
  
  return  TabChildCoursesView; 
});