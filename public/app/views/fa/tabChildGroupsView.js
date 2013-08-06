/*
 * View, що отримує конфігураційний масив,
 * підвантажує всі необхідні колекції (масиви для селект-боксів)
 * і викликає з цими параметрами tabChildView
 */


define([
  'jquery',
  'underscore',
  'backbone',
  'views/fa/tabChildView',
  'models/group/GroupModel',

  'collections/groups/GroupsCollection',
  'collections/courses/CoursesCollection',
  'collections/departments/DepartmentsCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, TabChildView, GroupModel, GroupsCollection, CoursesCollection, DepartmentsCollection, TeachersCollection){   
   
  var TabChildGroupsView = Backbone.View.extend({


    tagName: 'div',

    setConfig: function(){
      var config = {
      	model: GroupModel,
        col: this.groups_col,
        data: [{
            _link: 'name',
            label:'Group Name',
            type:'text'
          },
          {
            _link: 'number_of_students',
            label: 'Number Of Studs',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Department Head',
            type:'select',
            src:this.teachers_col.toJSON()
          },
          {
            _link: 'course_id',
            label: 'Course',
            type:'select',
            src:this.courses_col.toJSON()
          },
          {
            _link: 'department_id',
            label: 'Department',
            type:'select',
            src:this.departments_col.toJSON()
          },
          {
            _link: 'teacher_id',
            label: 'Curator',
            type:'select',
            src:this.teachers_col.toJSON()
          }
        ],
        buttons: {
        	create: 'New Group'
        }
      };
      
      return config;
    },
    
    loadData: function(){
      var that = this; 

      this.groups_col = new GroupsCollection();
      this.courses_col = new CoursesCollection();      
      this.departments_col = new DepartmentsCollection();
      this.teachers_col = new TeachersCollection();
      
      $.when(this.groups_col.fetch() && this.courses_col.fetch() && this.departments_col.fetch() && this.teachers_col.fetch()).then(function(){
        that.trigger('onDataLoaded');
      })
    },


    initialize: function(){         
      var that = this;
      
      that.loadData();  
      this.on('onDataLoaded', function(){
      	that.config = that.setConfig();
      	that.childView = new TabChildView(that.config);
        that.render();
      });     
    },

    render: function (){
      var that=this;
        
      //console.log(that.childView.$el.html());
      var htmlContent = that.childView.$el.html()
      
      //when everything has loaded - trigger global event
      GlobalEventBus.trigger('tabChildSupViewLoaded', htmlContent, that.config);
      return this;
    }
  
  });
  
  return  TabChildGroupsView;
  
});