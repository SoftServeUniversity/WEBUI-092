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
  
  'collections/departments/DepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, TabChildView,  DepartmentsCollection, FacultiesCollection, TeachersCollection){   
   
  var TabChildDepartmentsView = Backbone.View.extend({


    tagName: 'div',
    
    
    setConfig: function(){
      var config = {
        entity: this.departments_col.toJSON(),
        data: [{
            _link: 'name',
            label:'Department Name',
            type:'text'
          },
          {
            _link: 'teacher_id',
            label: 'Department Head',
            type:'select',
            src:this.teachers_col.models
          },
          {
            _link: 'faculty_id',
            label: 'Faculty Name',
            type:'select',
            src:this.faculties_col.models
          }
        ]
      };
      
      return config;
    },
    
    
    loadData: function(){
      var that = this; 
      
      this.departments_col = new DepartmentsCollection();
      this.faculties_col = new FacultiesCollection();
      this.teachers_col = new TeachersCollection();
      
      $.when(this.departments_col.fetch() && this.faculties_col.fetch() && this.teachers_col.fetch()).then(function(){
        that.trigger('onDataLoaded')
      })
    },


    initialize: function(){   
      
      var that = this;
      var config; 
      
      that.loadData(); 
       
      this.on('onDataLoaded', function(){
      config = that.setConfig();
      this.render(config);
      console.log(config)
      //trigger global event (we listen to it in tabParentView.js)
      vent.trigger('tabChildSupViewLoaded');
      }); 
           
    },
    
    
    events: {
    },


    beforeCreateTable: function(){     
    },


    render: function (config){
      var childView = new TabChildView(config);
      this.$el.append(childView.$el.html())
      return this;
    }
    
     
  });
  
  return  TabChildDepartmentsView;
  
});