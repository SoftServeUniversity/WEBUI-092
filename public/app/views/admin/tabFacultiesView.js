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
        
        fields     : {
          
          name: {
            label: 'Факультет',
            type: 'text'
          },
          
          teacher_id: {
            label: 'Адміністратор факультету',
            type: 'select',
            collection: me.collections.teachers
          }

        },
        
        buttons: {
        	create: 'Додати факультет'
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