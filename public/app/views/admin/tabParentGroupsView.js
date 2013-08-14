define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/tabChildView',
  'models/group/GroupModel',

  'collections/groups/GroupsCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/TeachersCollection',
  'collections/departments/DepartmentsCollection'

], function($, _, Backbone, TabChildView, GroupModel, GroupsCollection, CoursesCollection, TeachersCollection, DepartmentsCollection){   
   
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
            _link: 'course_id',
            label: 'Course',
            type:'select',
            src:this.courses_col.toJSON()
          },
          {
            _link: 'teacher_id',
            label: 'Teacher Name',
            type:'select',
            src:this.teachers_col.toJSON()
          },
          {
            _link: 'department_id',
            label: 'Department Name',
            type:'select',
            src:this.departments_col.toJSON()
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
      this.teachers_col = new TeachersCollection();
      this.departments_col = new DepartmentsCollection();
      
      this.groups_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Groups');
      }})
      this.courses_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Courses');
      }})
      this.teachers_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Teachers');
      }})
      this.departments_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Departments');
      }})
    },


    initialize: function(){         
      var that = this;
      
      that.loadData(); 
      var groups = false;
      var courses = false;
      var teachers = false;
      var departments = false;

      this.on('onDataLoaded', function(flag){

        if (flag == 'Groups'){
          groups = true
        }
        if (flag == 'Courses'){
          courses = true
        }
        if (flag == 'Teachers'){
          teachers = true
        }
        if (flag == 'Departments'){
          departments = true
        }
        if (groups == true && courses == true && teachers == true && departments == true) {
          that.config = that.setConfig();
          that.childView = new TabChildView(that.config);
          that.render(); 
        }
      })     
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