define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/parentTabTemplate.html',
  'views/admin/itemView',
  'views/admin/tableHeadView'

], function($, _, Backbone, parentTabTemplate, ItemView, TableHeadView){   
   
  var ParentTabView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      
      var me = this;
      var config;

      this.loadData();

      this.on('dataLoaded', function(){
        
        config = this.setConfig();
        this.collection = config.collection;
        config = this.augmentConfig(config);
        
        me.render(config)

        //all content has loaded, it's time for parent view to render tab
        GlobalEventBus.trigger('tabSubViewLoaded', me.$el, config);
        
        //display question mark on tab if some model needs verification
        if (config.verification){
          me.checkVerification(config.verification);
        }

        //this method is used only in works view
        if (me.addCustomEvents) {me.addCustomEvents ()}
      })


    },

    augmentConfig: function(config){

        if (!config.table_class){
          config.table_class = '';
        }
        return config;

    },

    render: function (config){
      
      var me = this;    

      //render containing table
      var compiledTemplate = _.template(parentTabTemplate, { conf: config });
      me.$el.html(compiledTemplate); 
    
      //render table head
      var tableHeadView = new TableHeadView({ conf: config });
      me.$('#tab-head').html(tableHeadView.render().$el); 

      //render rows
      this.collection.each(function(item) {
        var itemView = new ItemView({ model: item, conf: config }); 
        me.$('#tab-body').append(itemView.render().$el)
      });
      
      return this;
    },

    checkVerification: function(config){

      var me = this;

      var collection = config.collection.toJSON();
      
      $.each(collection, function(key, value){
        if (value['verified'] == 0){
          $('#'+config.tab_id).addClass('needs-verification')
        }
      })

    },

    //asynchronously load all collections what tab needs
    loadData: function(){

      var me = this;
      var collections_length = 0;
      var loadCounter = 0;
      me['collections'] = {};

      for (var c in me.collections_classes){
        collections_length++;
      }

      for (var c in me.collections_classes){
        me['collections'][c] = new me.collections_classes[c]();
        me['collections'][c].fetch({ success: function(c) {
            loadCounter++;
            if (loadCounter == collections_length){
              me.trigger('dataLoaded');
            }
          }  
        })
      }
    }

 
  });
  
  return  ParentTabView;
  
});