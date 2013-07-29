define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/departmentsListTemplate.html',
  'collections/fa/FaDepartmentsCollection',
  
  //для виведення селектів завантажуєм колекцію факультетів
  'collections/faculties/FacultiesCollection',

], function($, _, Backbone, departmentsListTemplate, FaDepartmentsCollection, FacultiesCollection, FaRoleModel){   


  var FaDepartmentsView = Backbone.View.extend({
    el: $('#content'),
    initialize: function() {
      var DLoaded = false;
      var FLoaded = false;
      
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
      })
    },
  
   /*
    * тепер колекції факультетів і кафедр завантажуються асинхронно: 
    * метод loadData викликається в файлі routes.js
    */    
    loadData: function () {
      
      var that = this;
      that.facultiesCollection = new FacultiesCollection();
	    that.facultiesCollection.fetch({
	      success: function (){
           	that.trigger('DataLoaded', 'DLoaded', that.facultiesCollection)
	      } 
	    });
      that.faDepartmentsCollection = new FaDepartmentsCollection();
        that.faDepartmentsCollection.fetch({
           success: function(){
           	that.trigger('DataLoaded', 'FLoaded', that.faDepartmentsCollection)
           }
        });
    },
    
    render: function (){
      var that = this;

      var data = {
        entities: that.faDepartmentsCollection.models,
        faculties: that.facultiesCollection.models,
        _: _
      };
      var compiledTemplate = _.template( departmentsListTemplate, data);

      this.$el.html(compiledTemplate);
    },
    events: {
      // показати приховані інпути (краще завжди задавати цей клас, щоб не плодити хендлерів)	
      'dblclick .dblclick-text'   : 'showInput',
      //зберегти зміни дані в інпуті змінено  
      'blur .dblclick-input'      : 'saveData',
      
      'click .open-modal'         : 'openModal',
      'click .close-m'            : 'closeModal',
      'click .save'               : 'closeModal',
      'click .open-modal-import'  : 'openModalImport',
      'click #newDepartment'      : 'newDepartment', 
      'click #create_button'      : 'saveData'
    },
    showInput: function(e){
       $(e.target).css('display', 'none').next().css('display','block');	 
    },
    saveData: function (e){
      //Валідація поля name за допомогою регулярних виразів
      var name = document.getElementById("dept-name").value;
      var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
      if (ck_name.test(name)) {
        $('#department-header').append("<div class='alert alert-success'><strong>Success!</strong>You have successfully created a department.</div>");
        window.setTimeout(function () {
          $('.alert-success').fadeOut();
          $('.alert-error').fadeOut();
        }, 2000);
      }
      else{
        $('#department-header').append("<div class='alert alert-error'><a class='close' data-dismiss='alert'>×</a> <strong>Error!</strong>Name should be between 3 and 20 characters.</div>");
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
      $('#content-table').append("<tr><td class='text-center'><input id='dept-name' type='text' size='10' placeholder='Enter Name'/></td><td class='text-center'><select><option selected value='Крокодил Гена'>Крокодил Гена</option><option value='Edvart Шапокляк'>Edvart Шапокляк</option><option value='Лариса Linkoln'>Лариса Linkoln</option></select></td><td class='text-center'><select><option selected value='Doing Nothing'>Doing Nothing</option><option value='Pickup'>Pickup</option><option value='Mathematics'>Mathematics</option></select></td><td class='text-center'><button class='btn btn-success' id='create_button'>Create</button></td></tr>");
    }
  });
  return  FaDepartmentsView;
});