define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/parentTabTemplate.html'
], function($, _, Backbone, parentTabTemplate){   
   
  var ParentTabView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      
      var me = this; 
      
      this.on('onDataLoaded', function(){
           
            me.config = this.setConfig();
            var data = me.buildJSON(me.config)
            me.render(data)
            
            GlobalEventBus.trigger('tabChildSupViewLoaded', me.$el.html(), me.config);
      })

      this.loadData();
    },

    /* 
    * bind all collections needed for select-boxes, labels, visible items
    * to items and their fields
    */
    buildJSON: function(config){

      var me = this;

      var json_data=config.collection.toJSON();
      
      //loop through all entities
      var rel = {};
      var visible_fields = [];
      var labels = [];
        
        //loop through data
        for (i=0; i<config.data.length; i++) {

          var rel_link = config.data[i]['_link'];
          var label = config.data[i]['label']; 
           
          //if select box
          if (config.data[i]['src']){      
             var rel_src = config.data[i]['src'].toJSON();
               
             //array of foreign keys, mapped to collections
             rel[rel_link]=rel_src;
          }
          
          labels.push(label);
          visible_fields.push(config.data[i]['_link'])
        }
        
        for (a=0; a<json_data.length; a++){
           json_data[a]['selectbox_items'] = [];  

          for (var e_obj in json_data[a]){
            if (e_obj in rel){    

              json_data[a]['selectbox_items'].push(e_obj);
              json_data[a][e_obj+'_collection'] = rel[e_obj];
            }
            
            json_data[a]['visible_fields'] = visible_fields;
            json_data[a]['labels'] = labels;
           
          }
        }
        var data = {};
        data.entities = json_data;
        
        return data; 
    },

    render: function (data){
      var that = this;
      var compiledTemplate = _.template(parentTabTemplate, data);
      that.$el.html(compiledTemplate);  
      return this;
    },

    //method to load all collections for tab 
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
              me.trigger('onDataLoaded');
            }
          }  
        })
      }
    },

  });
  
  return  ParentTabView;
  
});