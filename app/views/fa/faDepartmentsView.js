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
    
    //завантаження колекцій 
    loadData: function () {
      var that=this;
      
      this.faTeachersCollection = new TeachersCollection();
      this.faFacultiesCollection = new FacultiesCollection();
      this.faDepartmentsCollection = new FaDepartmentsCollection();
      
      $.when(this.faTeachersCollection.fetch() && this.faFacultiesCollection.fetch() 
      && this.faDepartmentsCollection.fetch()).then(function(){
        that.render();	
      })   
             	
      /*
      * якщо стались зміни в якійсь з моделей - завнтажуємо колекції і рендеримо ще раз
      */
      this.faDepartmentsCollection.off('change', this.loadData);
	  this.faDepartmentsCollection.on('change', this.loadData);

    },

    
    render: function (){

      var params = {
        entities:this.faDepartmentsCollection,
      	teachers:this.faTeachersCollection,
      	faculties:this.faFacultiesCollection	
      }	;

      var departmentListView = new DepartmentListView(params);
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
      'click #newDepartment'      : 'createNew', 
      'click #create_button'      : 'saveData'//,
    },
    
    showInput: function(e){
       $(e.target).css('display', 'none').next().css('display','block');	
    },
    
    //якщо змінено одне з полів існуючих елементів
    changed: function (e){
    	
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
    	
        var field_name = $(e.target).attr('name');
        
        //отримуєм id моделі
        var entity_id = $(e.target).closest('.model').attr('id');
        var model_id = parseInt(entity_id.match(/\d+$/).join(''));	
       
        var model = (this.faDepartmentsCollection.get(model_id));

        model.set(field_name, $(e.target).val());
        model.save();

        $('.list .toggle-input').css('display','none');
	    $('.list .toggle-text').css('display', 'block');
       }   
    },
    
    createNew: function(){
      $('.new-item').css('display', 'none');
      var el = "#content-table";
      var newModel = new DepartmentModel();
      var data = {
        newElement:true,
        entity:newModel,
        teachers: this.faTeachersCollection.models,
        faculties: this.faFacultiesCollection.models
      };
      var elementView = new DepartmentElementView(data);
      $(el).append(elementView.$el.html())
    },
    
    saveData: function (e){
      //Валідація поля name за допомогою регулярних виразів
      var name = document.getElementById("dept-name").value;
      var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
      if (ck_name.test(name)) {
        $('#dept-header').append("<div class='alert alert-success'><strong>Success!</strong>You have successfully created a department.</div>");
        window.setTimeout(function () {
          $('.alert-success').fadeOut();
          $('.alert-error').fadeOut();
        }, 2000);
      }
      else{
        $('#dept-header').append("<div class='alert alert-error'><a class='close' data-dismiss='alert'>×</a> <strong>Error!</strong>Name should be between 3 and 20 characters.</div>");
      }
      console.log(name);
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