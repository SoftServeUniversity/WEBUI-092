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
      
      this.departments_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Departments');
      }})
      this.faculties_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Faculties');
      }})
      this.teachers_col.fetch({success: function(){
        that.trigger('onDataLoaded', 'Teachers');
      }})
           

    },


    initialize: function(){         
      var that = this;
      
      that.loadData();  
      
      var departments = false;
      var faculties = false;
      var teachers = false;

      this.on('onDataLoaded', function(flag){

        if (flag == 'Departments') {
          departments = true;
        }
        if (flag == 'Faculties') {
          faculties = true;
        }
        if (flag == 'Teachers') {
          teachers = true;
        }
        if(departments == true && faculties == true && teachers == true) {
          that.config = that.setConfig();
          that.childView = new TabChildView(that.config);
          that.render();
        }
 
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