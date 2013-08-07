/*
 * View, що отримує конфігураційний масив,
 * підвантажує всі необхідні колекції (масиви для селект-боксів)
 * і викликає з цими параметрами tabChildView
 */


define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/tabChildView',
  'models/department/DepartmentModel',

  'collections/departments/DepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, TabChildView, DepartmentModel, DepartmentsCollection, FacultiesCollection, TeachersCollection){   
   
  var TabChildDepartmentsView = Backbone.View.extend({


    tagName: 'div',

    setConfig: function(){
      var config = {
      	model: DepartmentModel,
        col: this.departments_col,
        data: [{
            _link: 'name',
            label:'Department Name',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Department Head',
            type:'select',
            src:this.teachers_col.toJSON()
          },
          {
            _link: 'faculty_id',
            label: 'Faculty Name',
            type:'select',
            src:this.faculties_col.toJSON()
          }
        ],
        buttons: {
        	create: 'New Department'
        }
      };
      
      return config;
    },
    
    loadData: function(){
      var that = this; 
      
      this.departments_col = new DepartmentsCollection();
      this.faculties_col = new FacultiesCollection();
      this.teachers_col = new TeachersCollection();
      
      $.when(this.departments_col.fetch() && this.faculties_col.fetch() && this.teachers_col.fetch()).then(function(){
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
  
  return  TabChildDepartmentsView;
  
});