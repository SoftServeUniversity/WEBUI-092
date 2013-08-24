define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/work/WorkTasksModel',
  'collections/work/WorkCollection',
  'collections/students/StudentsCollection'

], function($, _, Backbone, ParentTabView, WorkModel,
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
        buttons: {
        	create: 'Додати роботу'
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabWorksView;
  
});