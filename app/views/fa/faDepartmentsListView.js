define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/departmentsListTemplate.html',
  'collections/fa/FaDepartmentsCollection',
  
  //для виведення селектів завантажуєм колекцію факультетів
  'collections/faculties/FacultiesCollection',

], function($, _, Backbone, departmentsListTemplate, FaDepartmentsCollection, FacultiesCollection){   


  var FaDepartmentsView = Backbone.View.extend({
    
    el: $('#content'),
    initialize: function() {
   
      var DLoaded = false;
      var FLoaded = false;
      
      
      _.bindAll(this, 'loadData');
      
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
    	
    	/*
    	 * коли завантажились всі колекції - передаєм дані в render() метод
    	 */
    	if ((DLoaded == true) && (FLoaded == true)){
    		this.render();
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
	      $('.toggle-input').css('display','none');
	      $('.toggle-text').css('display', 'block');	
	    }

      })
  
      /*
       * bindAll fixes a loss of scope. For example when we need to use
       * this.render inside a setTimeout callback or event handler
       * 
       */
  
  
    },
  
   /*
    * тепер колекції факультетів і кафедр завантажуються асинхронно: 
    * метод loadData викликається в файлі routes.js
    */    
    loadData: function () {
      //console.log('hello from loaddata');
      var that=this;
      this.facultiesCollection = new FacultiesCollection();
	  this.facultiesCollection.fetch({
	    success: function (){
          that.trigger('DataLoaded', 'DLoaded', that.facultiesCollection)
	    } 
	  });
      this.faDepartmentsCollection = new FaDepartmentsCollection();
      this.faDepartmentsCollection.fetch({
        success: function(){
          that.trigger('DataLoaded', 'FLoaded', that.faDepartmentsCollection)
        }
      });
          
	  this.faDepartmentsCollection.bind('change', function(){
	    that.loadData();
	  });
    	
    },
    
    render: function (){

      var data = {
        entities: this.faDepartmentsCollection.models,
        faculties: this.facultiesCollection.models,
        _: _
      };
      var compiledTemplate = _.template( departmentsListTemplate, data);

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
      'click #newDepartment'      : 'newDepartment'
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
        $('.toggle-input').css('display','none');
	    $('.toggle-text').css('display', 'block');
       }   
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
    newDepartment: function(){
      $('#content-table').append("<tr><td class='text-center'><input type='text' size='10' placeholder='Ender Name'></td><td class='text-center'><select><option selected value='Крокодил Гена'>Крокодил Гена</option><option value='Edvart Шапокляк'>Edvart Шапокляк</option><option value='Лариса Linkoln'>Лариса Linkoln</option></select></td><td class='text-center'><select><option selected value='Doing Nothing'>Doing Nothing</option><option value='Pickup'>Pickup</option><option value='Mathematics'>Mathematics</option></select></td><td class='text-center'><button class='btn btn-success'>Create</button></td></tr>");
    }
  });
  return  FaDepartmentsView;
});