define([
  'jquery',
  'underscore',
  'backbone',
  'models/teacher/TeacherModel',
  'collections/faculty_admins/FacultyAdminsCollection',
  'views/admin/parentTabView'
  
], function($, _, Backbone, TeacherModel, FacultyAdminsCollection, ParentTabView){   
	 
  var tabChildAdminsView = ParentTabView.extend({

    //is used to load collections asynchrounously
    collections_classes: {
      faculty_admins: FacultyAdminsCollection
    },

    //runs when all collections have been loaded
    setConfig: function(){
    	
      var me = this;

      var config = {
      	
        model: TeacherModel,
        
        collection: me.collections.faculty_admins,
        
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
          },

          faculty: {
            label: 'Факультет',
            type :'simple'
          }
        },

        buttons: {
          create: false
        },

        verification: {
          collection:me.collections.faculty_admins,
          tab_id:'admins-tab'
        }
        
      };
      
      return config;
    },

  });
  
  return  tabChildAdminsView;
  
});










