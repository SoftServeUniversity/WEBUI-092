define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/group/GroupModel',
  'collections/groups/GroupsCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/teachersProxyCollection',
  'collections/departments/DepartmentsCollection'

], function($, _, Backbone, ParentTabView, GroupModel, GroupsCollection, CoursesCollection,
            TeachersProxyCollection, DepartmentsCollection){   
   
  var TabChildGroupsView = ParentTabView.extend({

    collections_classes: {
      groups      : GroupsCollection,
      courses     : CoursesCollection,
      teachers    : TeachersProxyCollection,
      departments : DepartmentsCollection
    },


    dataFilter: { faculty_id: 1 },

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

  });
  
  return  TabChildGroupsView;
  
});