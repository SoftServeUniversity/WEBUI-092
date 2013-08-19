define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/tabChildView',
  'models/department/DepartmentModel',
  'collections/departments/DepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, TabChildView, DepartmentModel, DepartmentsCollection,
            FacultiesCollection, TeachersCollection){   
   
  var TabChildDepartmentsView = TabChildView.extend({

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
            label:'Department Name',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Department Head',
            type:'select',
            src:me.collections.teachers
          },
          {
            _link: 'faculty_id',
            label: 'Faculty Name',
            type:'select',
            src:me.collections.faculties
          }
        ],
        buttons: {
        	create: 'New Department'
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabChildDepartmentsView;
  
});