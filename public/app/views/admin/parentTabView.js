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
        
        this.config = me.setConfig();

        me.collection = this.config.collection;
        
        this.config = me.augmentConfig();
        
        me.render(this.config)

        //all content has loaded, it's time for parent view to render tab
        GlobalEventBus.trigger('tabSubViewLoaded', me.$el, me.config);
        
        GlobalEventBus.on('NewItemAdded', function(model){
          me.renderSingleItem(model);
        })
        //display question mark on tab if some model needs verification
        if (this.config.verification){
          me.checkVerification(this.config.verification);
        }

        //this method is used only in works view
        if (me.addCustomEvents) {me.addCustomEvents ()}
      })


    },

    augmentConfig: function(){

        if (!this.config.table_class){
          this.config.table_class = '';
        }
        return this.config;

    },

    render: function (){
      
      var me = this;    

      //render containing table
      var compiledTemplate = _.template(parentTabTemplate, { conf: me.config });
      me.$el.html(compiledTemplate); 
    
      //render table head
      var tableHeadView = new TableHeadView({ conf: me.config });
      me.$('#tab-head').html(tableHeadView.render().$el); 

      //render rows
      this.collection.each(function(item) {
        me.renderSingleItem(item)
      });
      
      return this;
    },
    
    renderSingleItem: function(item){
      this.config.newModel = false;
      var itemView = new ItemView({ model: item, conf: this.config, newModel: false }); 
      this.$('#tab-body').append(itemView.render().$el)
    },

    checkVerification: function(config){

      var me = this;

      var collection = me.config.collection.toJSON();
      
      $.each(collection, function(key, value){
        if (value['verified'] == 0){
          $('#'+me.config.tab_id).addClass('needs-verification')
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