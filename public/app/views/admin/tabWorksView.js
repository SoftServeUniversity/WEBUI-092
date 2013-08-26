define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'views/admin/editDialogView',
  'models/work/WorkTasksModel',
  'collections/work/WorkCollection',
  'collections/students/StudentsCollection'

], function($, _, Backbone, ParentTabView, EditDialogView, WorkModel,
            WorkCollection, StudentsCollection){   
   
  var TabWorksView = ParentTabView.extend({

    collections_classes: {
      works       : WorkCollection,
      students    : StudentsCollection
    },

    setConfig: function(){
      var me = this;

      var config = {
      	
        model     : WorkModel,
        collection: me.collections.works,
        data      : [{
            _link: 'name',
            label:'Роботи',
            type:'static'
          },
          {
            _link: 'student_id',
            label:'Студент',
            type:'static',
            src: me.collections.students
          }
        ],
        item_buttons: {
          remove: false,
          edit: 'Змінити назву роботи'
        },
        buttons: {
        	create: 'Додати роботу'
        }

      };
      
      return config;
    },
    

    initialize: function(){ 
      var me = this;
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    },
    
    showEditDialog: function(e){
       var model_id = $(e.target).closest('.model').attr('model_id');
       var collection = this.config.collection;
       new EditDialogView(model_id, collection);
    },

    addCustomEvents: function(){
      var me = this;
      $('.edit-button').on('click', function(e){
        me.showEditDialog(e);
      })
    }


  
  });
  
  return  TabWorksView;
  
});