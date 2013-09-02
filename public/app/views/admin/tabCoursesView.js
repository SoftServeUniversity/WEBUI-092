define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/course/CourseModel',
  'collections/courses/CoursesCollection'

], function($, _, Backbone, ParentTabView, CourseModel, CoursesCollection){   
   
  var TabChildCoursesView = ParentTabView.extend({

    collections_classes: {
      courses: CoursesCollection
    },

    //runs when all collections have loaded
    setConfig: function(){
      var me = this; 
      
      config = {

        model: CourseModel,
        
        collection: me.collections.courses,
        
        fields: {
          
          name: {
            label:'Назва курсу',
            type:'text'
          }
        },

        buttons: {
          create: 'Додати курс'
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