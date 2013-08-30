define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/admin/FaAdminModel',
  'collections/admin/FaAdminsCollection',
  'collections/faculties/FacultiesCollection',
  'views/admin/parentTabView'
  
], function($, _, Backbone, FaAdminModel, FaAdminsCollection, FacultiesCollection, ParentTabView){   
	 
  var tabChildAdminsView = ParentTabView.extend({


    collections_classes: {
      fadmins: FaAdminsCollection,
      faculties: FacultiesCollection
    },

    setConfig: function(){
    	var me = this;

      var config = {
      	
        model: FaAdminModel,
        
        collection: me.collections.fadmins,
        
        fields: {
          name: {
            label:'Ім\'я',
            type :'text' 
          },
          lastName: {
            label:'Прізвище',
            type :'text'
          },
          middleName: {
            label:'По-батькові',
            type :'text'
          },
          /*email: {
            label: 'Email',
            type :'text'
          }*/
          faculty_id: {
            label: 'Тестовий факультет',
            type: 'select',
            collection: me.collections.faculties
          }
        },

        buttons: {
        	create: 'Додати адміністратора факультету'
        },

        verification: {
          collection:me.collections.fadmins,
          tab_id:'admins-tab'
        }
      };
      
      return config;
    },

    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  tabChildAdminsView;
  
});










