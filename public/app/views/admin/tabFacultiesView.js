define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/faculty/FacultyModel',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/teachersProxyCollection'

], function($, _, Backbone, ParentTabView, FacultyModel,
            FacultiesCollection, TeachersProxyCollection){   
   
  var TabFacultiesView = ParentTabView.extend({

    collections_classes: {
      faculties   : FacultiesCollection,
      teachers    : TeachersProxyCollection
    },

    childViews: [],

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
          
          user_id: {
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