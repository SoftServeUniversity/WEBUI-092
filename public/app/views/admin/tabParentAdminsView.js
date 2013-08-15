define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/admin/FaAdminModel',
  'collections/admin/FaAdminsCollection',
  'views/admin/tabChildView'
  
], function($, _, Backbone, FaAdminModel, FaAdminsCollection, TabChildView){   
	 
  var tabChildAdminsView = Backbone.View.extend({


    tagName: 'div',

    setConfig: function(){
    	
      var config = {
      	model: FaAdminModel,
        col: this.faAdminsCollection,
        data: [{
            _link: 'name',
            label:'Name',
            type:'text'
          },
          {
            _link: 'lastName',
            label:'Last Name',
            type:'text'
          },
          {
            _link: 'middleName',
            label:'Middle Name',
            type:'text'
          },
          {
            _link: 'email',
            label: 'Email',
            type:'text'
          }
        ],
        buttons: {
        	create: 'New Admin'
        }
      };
      
      return config;
    },


    loadData: function(){
      var that = this; 
      
      this.faAdminsCollection = new FaAdminsCollection();

      this.faAdminsCollection.fetch({ success: function(){
        that.trigger('onDataLoaded');
      }})

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
      var htmlContent = that.childView.$el.html();
      
      //when everything has loaded - trigger global event
      GlobalEventBus.trigger('tabChildSupViewLoaded', htmlContent, that.config);
      return this;
    }
  
  });
  
  return  tabChildAdminsView;
  
});










