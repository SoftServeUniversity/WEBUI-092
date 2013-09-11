define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/teacher/TeacherModel',
  'collections/teachers/TeachersCollection',
  'collections/faculties/FacultiesCollection',
  'collections/departments/DepartmentsCollection'



], function($, _, Backbone, ParentTabView, TeacherModel,
            TeachersCollection, FacultiesCollection, DepartmentsCollection){   
   
  var TabTeachersView = ParentTabView.extend({

    collections_classes: {
      teachers     : TeachersCollection,
      faculties    : FacultiesCollection,
      departments  : DepartmentsCollection
    },

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