define([
  'jquery',
  'underscore',
  'backbone',
  'views/fa/DepartmentListView',
  'views/fa/DepartmentElementView',

  'text!templates/fa/departmentsTemplate.html',
  'collections/teachers/TeachersCollection',
  'collections/fa/FaDepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'models/department/DepartmentModel'


], function($, _, Backbone, DepartmentListView, DepartmentElementView, departmentsTemplate, TeachersCollection, FaDepartmentsCollection, FacultiesCollection, DepartmentModel){   


  var FaDepartmentsView = Backbone.View.extend({
    
    el: $('#content'),
    
    initialize: function() {
    	console.log('init')

      var that=this;
      var DLoaded = false;
      var FLoaded = false;
      var TLoaded = false;

      /*
       * коли завантажилась яка-небудь з колекцій -
       * викликається цей handler
       */
      this.on('DataLoaded', function(flag, value){

    	if (flag=='DLoaded'){
     	  DLoaded = true;
    	};
    	if (flag=='FLoaded'){
    	  FLoaded = true;
    	};
    	if (flag=='TLoaded'){
    	  TLoaded = true;
    	};
    	
    	/*
    	 * коли завантажились всі колекції - передаєм дані в render() метод
    	 */
    	if ((DLoaded == true) && (FLoaded == true) && (TLoaded == true)){

             this.render();
    	         console.log('dataLoaded')

    	
    	}

      
      });
      
     
     /*
      * цей метод відповідає за завантаження колекцій 
      */
     this.loadData(); 
     
     
     
      
      /*
       * якщо хтось клікнув на текстове поле і нічого в ньому не змінив,
       * то ховаєм поле, коли юзер клікає деінде
       */
      $('body').on('click',function(e){
      	var input = $('.toggle-input').first().get(0);
        if ($(e.target).closest('.toggle-input').length > 0){	
	    } else {
	      $('.list .toggle-input').css('display','none');
	      $('.list .toggle-text').css('display', 'block');	
	    }

      })
    },
  
   /*
    * колекції факультетів і кафедр завантажуються асинхронно: 
    */    
    loadData: function () {

      console.log('hello from loaddata');
      var that=this;
      
      this.faTeachersCollection = new TeachersCollection();
	  this.faTeachersCollection.fetch({
	    success: function (){
          that.trigger('DataLoaded', 'TLoaded', that.faTeachersCollection)
	    } 
	  });

      this.faFacultiesCollection = new FacultiesCollection();
	  this.faFacultiesCollection.fetch({
	    success: function (){
          that.trigger('DataLoaded', 'DLoaded', that.faFacultiesCollection)
	    } 
	  });
      this.faDepartmentsCollection = new FaDepartmentsCollection();
      this.faDepartmentsCollection.fetch({
        success: function(){
          that.trigger('DataLoaded', 'FLoaded', that.faDepartmentsCollection)
        }
      });   	

      /*
      * якщо стались зміни в якійсь з моделей - рендеримо ще раз
      */

      this.faDepartmentsCollection.off('change', this.loadData);
	  this.faDepartmentsCollection.on('change', this.loadData);

    },

    
    render: function (){
    	console.log('asdf');


      var params = {
        entities:this.faDepartmentsCollection,
      	teachers:this.faTeachersCollection,
      	faculties:this.faFacultiesCollection	
      }	;

      var departmentListView = new DepartmentListView(params);
      //console.log(departmentListView.$el.html())
      var data = {
        list: departmentListView.$el.html(),
        _: _
      };
      var compiledTemplate = _.template( departmentsTemplate, data);
      this.$el.html(compiledTemplate);
    },
    
    events: {
      'dblclick .toggle-text'     : 'showInput',
      //зберегти зміни, коли дані в інпуті змінено  
      'blur .toggle-input'        : 'changed',
      'keypress .toggle-input'    : 'changed',

      'click .open-modal'         : 'openModal',
      'click .close-m'            : 'closeModal',
      'click .save'               : 'closeModal',
      'click .open-modal-import'  : 'openModalImport',
      'click #newDepartment'      : 'createNew'
    },
    showInput: function(e){
       $(e.target).css('display', 'none').next().css('display','block');	
    },
    changed: function (e){
    	
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
    	
        var field_name = $(e.target).attr('name');
        
        //отримуєм id моделі
        var entity_id = $(e.target).closest('.model').attr('id');
        var model_id = parseInt(entity_id.match(/\d+$/).join(''));	
       
        var model = (this.faDepartmentsCollection.get(model_id));
        
        //змінена модель
        //console.log(mod);
        
        //поле і значення, що додаються до моделі
        // console.log(field_name);
        //console.log($(e.target).val())

        model.set(field_name, $(e.target).val());
        model.save();
        $('.list .toggle-input').css('display','none');
	    $('.list .toggle-text').css('display', 'block');
       }   
    },
    createNew: function(){
      $('.new-item').css('display', 'none');
      var el = "#content-table";
      var newModel = new  DepartmentModel();
      
      var data = {
      	newElement:true,
    	entity:newModel,
    	teachers: this.faTeachersCollection.models,
    	faculties: this.faFacultiesCollection.models
      };
      var elementView = new  DepartmentElementView(data);
      
      $(el).append(elementView.$el.html())
    },

    openModal: function(){
      $('#menage-department').modal('show');
    },
    closeModal: function(){
      $('#menage-department').modal('hide');
      $('#menage-department-import').modal('hide');
    },
    openModalImport: function(){
      $('#menage-department-import').modal('show');
    },
  });
  return  FaDepartmentsView;
});