define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/teacher/TeacherModel',
  'collections/faculties/UsersCollection',
  'views/admin/parentTabView'
  
], function($, _, Backbone, TeacherModel, UsersCollection, ParentTabView){   
	 
  var tabChildAdminsView = ParentTabView.extend({


    collections_classes: {
      users: UsersCollection
    },

    dataFilter: { role_ids: 2 },

    setConfig: function(){
    	var me = this;

      var config = {
      	
        model: TeacherModel,
        
        collection: me.collections.users,
        
        fields: {
          
          last_name: {
            label:'Прізвище',
            type :'text'
          },

          name: {
            label:'Ім\'я',
            type :'text' 
          }, 
                   
          middle_name: {
            label:'По-батькові',
            type :'text'
          },
          
          email: {
            label: 'Email',
            type :'text'
          }
        },

        buttons: {
          create: false
        },

        verification: {
          collection:me.collections.fadmins,
          tab_id:'admins-tab'
        }
        
      };
      
      return config;
    },




  
  });
  
  return  tabChildAdminsView;
  
});










