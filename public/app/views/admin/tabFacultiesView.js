define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/faculty/FacultyModel',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, ParentTabView, FacultyModel,
            FacultiesCollection, TeachersCollection){   
   
  var TabFacultiesView = ParentTabView.extend({

    collections_classes: {
      faculties   : FacultiesCollection,
      teachers    : TeachersCollection
    },

    setConfig: function(){
      var me = this;

      var config = {
      	
        model     : FacultyModel,
        collection: me.collections.faculties,
        data      : [{
            _link: 'name',
            label:'Faculty Name',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Faculty Admin',
            type:'select',
            src:me.collections.teachers
          }
        ],
        buttons: {
        	create: 'New Faculty'
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabFacultiesView;
  
});