define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/group/GroupModel',
  'collections/groups/GroupsCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/TeachersCollection',
  'collections/departments/DepartmentsCollection'

], function($, _, Backbone, ParentTabView, GroupModel, GroupsCollection, CoursesCollection,
            TeachersCollection, DepartmentsCollection){   
   
  var TabChildGroupsView = ParentTabView.extend({

    collections_classes: {
      groups      : GroupsCollection,
      courses     : CoursesCollection,
      teachers    : TeachersCollection,
      departments : DepartmentsCollection
    },

    setConfig: function(){
      
      var me = this;
      
      var config = {
      	
        table_class: 'DataTable',
        
        model     : GroupModel,
        
        collection: me.collections.groups,
       
        fields      : {
          
          name: {
            label: 'Група',
            type : 'text'
          },  
          
          course_id: {
            label: 'Курс',
            type : 'select',
            collection  : me.collections.courses
          },
          
          teacher_id: {
            label: 'Куратор групи',
            type : 'select',
            collection  : me.collections.teachers
          },
          
          department_id: {
            label: 'Кафедра',
            type : 'select',
            collection  : me.collections.departments
          }
        
        },
        
        buttons: {
        	create : 'Додати групу'
        }
      
      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }

  });
  
  return  TabChildGroupsView;
  
});