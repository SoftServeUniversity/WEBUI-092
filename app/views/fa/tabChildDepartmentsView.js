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
            src:this.teachers_col.toJSON()
          },
          {
            _link: 'faculty_id',
            label: 'Faculty Name',
            type:'select',
            src:this.faculties_col.toJSON()
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
        that.trigger('onDataLoaded');
      })
    },


    initialize: function(){   
      
      var that = this;
      var config; 
      
      that.loadData(); 
       
      this.on('onDataLoaded', function(){
      	config = that.setConfig();
      
      	this.buildJSON(config);

      
      
      
      //trigger global event (we listen to it in tabParentView.js)
      vent.trigger('tabChildSupViewLoaded');
      }); 
           
    },
    
    buildJSON: function(config){
    	//loop through all entities
    		var rel = {};
    		var visible_fields = [];
    	    //loop through data
    	    for (i=0; i<config.data.length; i++) {
    	    	
    	    	for (var d_field in config.data[i]){
    	    	
    	    	}
    	    	
    	    	if (config.data[i]['src']){
    	    		 //console.log(config.data[i]['src'])
    	    		 var rel_link = config.data[i]['_link'];
    	    		 
    	    		 var rel_src = config.data[i]['src'];
    	    		 
    	    		 var obj = {};
    	    		 
    	    		 obj = rel_src;
    	    		 
    	    		 //array of foreign keys, mapped to collections
    	    		 rel[rel_link]=obj;
    	    		 
				}
				visible_fields.push(config.data[i]['_link'])
				
				

    	    }

    	    for (a=0; a<config.entity.length; a++){
    	    	 config.entity[a]['selectbox_items'] = []	

    	    	for (var e_obj in config.entity[a]){
    	    		
    	    		if (e_obj in rel){
    
    	    		  //console.log(rel[e_obj]);
    	    		  config.entity[a]['selectbox_items'].push(e_obj);
    	    		  config.entity[a][e_obj+'_collection'] = rel[e_obj];
    	    		  config.entity[a]['visible_fields'] = visible_fields;
    	    		}
    
    	    	}

    	    }
    	 data = {
    	 	
    	 	entities: config.entity
    	 };
    	 //console.log(data)
     	this.render(data);
    	
    	
    	
    	
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