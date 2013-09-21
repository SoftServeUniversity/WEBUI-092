define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/teacher/TeacherModel',
  'collections/teachers/TeachersCollection',
  'collections/departments/DepartmentsCollection'



], function($, _, Backbone, ParentTabView, TeacherModel,
            TeachersCollection, DepartmentsCollection){   
   
  var TabTeachersView = ParentTabView.extend({

    collections_classes: {
      teachers     : TeachersCollection,
      departments  : DepartmentsCollection
    },

    dataFilter: { faculty_id: 1 },

    setConfig: function(){

      var me = this;
      

      var config = {
      	
        model     : TeacherModel,
        
        collection: me.collections.teachers,
        
        fields    : {
          
          last_name: {
            label: 'Прізвище',
            type : 'text'
          },

          name: {
            label: 'Ім\'я',
            type : 'text'
          },

          middle_name: {
            label: 'По-батькові',
            type : 'text'
          },

          department_id: {
            label: 'Кафедра',
            type:'select',
            collection:me.collections.departments
          }

        },

        buttons: { 
          create:false          
        },

        verification: {
          collection:me.collections.teachers,
          tab_id:'teachers-tab'
        }
      
      };
      
      return config;
    }

  });
  
  return  TabTeachersView;
  
});