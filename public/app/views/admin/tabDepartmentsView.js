define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/department/DepartmentModel',
  'collections/departments/DepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, ParentTabView, DepartmentModel, DepartmentsCollection,
            FacultiesCollection, TeachersCollection){   
   
  var TabDepartmentsView = ParentTabView.extend({

    collections_classes: {
      departments : DepartmentsCollection,
      faculties   : FacultiesCollection,
      teachers    : TeachersCollection
    },

    setConfig: function(){
      var me = this;

      var config = {
      	
        model     : DepartmentModel,
        collection: me.collections.departments,
        data      : [{
            _link: 'name',
            label:'Кафедра',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Завідувач кафедри',
            type:'select',
            src:me.collections.teachers
          },
          {
            _link: 'faculty_id',
            label: 'Факультет',
            type:'select',
            src:me.collections.faculties
          }
        ],
        buttons: {
        	create: 'Нова кафедра'
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabDepartmentsView;
  
});