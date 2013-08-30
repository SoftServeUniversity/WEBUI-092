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
      
      // verification HACK
      me.verification = {
        collection:me.collections.teachers,
        tab_id:'teachers-tab'
      };

      var config = {
      	
        model     : TeacherModel,
        collection: me.collections.teachers,
        data      : [{
            _link: 'name',
            label: 'Ім\'я викладача',
            type : 'text'
          },
          {
            _link: 'faculty_id',
            label: 'Факультет',
            type:'select',
            src:me.collections.faculties
          },
          {
            _link: 'department_id',
            label: 'Кафедра',
            type:'select',
            src:me.collections.departments
          }
        ],
        buttons: {
        	create : 'Додати викладача'
        }
      
      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }

  });
  
  return  TabTeachersView;
  
});