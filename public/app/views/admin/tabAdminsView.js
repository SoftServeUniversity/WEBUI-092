define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/teacher/TeacherModel',
  'collections/teachers/TeachersCollection',
  'views/admin/parentTabView'
  
], function($, _, Backbone, TeacherModel, TeachersCollection, ParentTabView){   
	 
  var tabChildAdminsView = ParentTabView.extend({


    collections_classes: {
      fadmins: TeachersCollection
    },

    setConfig: function(){
    	var me = this;

      var config = {
      	
        model: TeacherModel,
        
        collection: me.collections.fadmins,
        
        fields: {
          
          name: {
            label:'Ім\'я',
            type :'text' 
          },
          
          last_name: {
            label:'Прізвище',
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

    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  tabChildAdminsView;
  
});










