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
      var date = new Date().getMilliseconds();

      this.groups_col = new GroupsCollection();
      this.courses_col = new CoursesCollection();
      this.teachers_col = new TeachersCollection();
      this.departments_col = new DepartmentsCollection();
      
      $.when(this.groups_col.fetch() && this.courses_col.fetch() && this.teachers_col.fetch() && this.departments_col.fetch()).then(function(){
        that.trigger('onDataLoaded');
        
        var date2 = new Date().getMilliseconds();

        console.log('loadData takes in milliseconds --- ' + (date2 - date));
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