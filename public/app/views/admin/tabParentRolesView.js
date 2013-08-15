define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/admin/FaRoleModel',
  'collections/admin/FaRolesCollection',
  'views/admin/tabChildView'
  
], function($, _, Backbone, FaRoleModel, FaRolesCollection, TabChildView){   
	 
  var tabChildRolesView = Backbone.View.extend({


    tagName: 'div',

    setConfig: function(){
    	
      var config = {
      	model: FaRoleModel,
        col: this.faRolesCollection,
        data: [{
            _link: 'name',
            label:'Role Name',
            type:'text'
          },
          {
            _link: 'role',
            label: 'Role',
            type:'text'
          },
          {
            _link: 'email',
            label: 'Email',
            type:'text'
          }
        ],
        buttons: {
        	create: 'New Role'
        }
      };
      
      return config;
    },


    loadData: function(){
      var that = this; 
      
      this.faRolesCollection = new FaRolesCollection();

      this.faRolesCollection.fetch({ success: function(){
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
  
  return  tabChildRolesView;
  
});










