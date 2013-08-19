define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/tabChildTemplate.html'
], function($, _, Backbone, tabChildTemplate){   
   
  var TabChildView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      var me = this; 
      this.on('onDataLoaded', function(flag){

          var loaded_num = 0; 
          for ( collection in me['collections'] ) {
            loaded_num ++; 

          }
          console.log(flag)
          //console.log( me.collections )
          //if all collections have loaded

          if (me.collections_number == loaded_num){
            me.config = this.setConfig();
            var data = me.buildJSON(me.config)
            me.render(data)
            
            GlobalEventBus.trigger('tabChildSupViewLoaded', me.$el.html(), me.config);

          }
      })
        
      
      this.loadData();


    },

    buildJSON: function(config){

      var me = this;

      var json_data=config.col.toJSON();
      //console.log(json_data)
      //loop through all entities
      var rel = {};
      var visible_fields = [];
      var labels = [];
        
        //loop through data
        for (i=0; i<config.data.length; i++) {

          var rel_link = config.data[i]['_link'];
          var label = config.data[i]['label']; 
           
          if (config.data[i]['src']){
             //console.log(config.data[i]['src'])
              
             var rel_src = config.data[i]['src'];
               
             var obj = {};
              
             obj = rel_src;
               
             //array of foreign keys, mapped to collections
             rel[rel_link]=obj;
            
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
      //console.log(data)
      var compiledTemplate = _.template(tabChildTemplate, data);
      that.$el.html(compiledTemplate);  
      //console.log(compiledTemplate)
      return this;
    },





    //new stuff 
    loadData: function(){

      var me = this;
      me['collections_number'] = 0;
      me['collections'] = {};
      

      for (var c in me.collections_classes){
        me['collections_number'] ++;
      }
      //console.log(me['tab_collections'])
      for (var c in me.collections_classes){
        me['collections'][c] = new me.collections_classes[c]();
        me['collections'][c].fetch({ success: function(c) {
            (function(i){me.trigger('onDataLoaded', i)})(c); 
          }  
        })
      }
    },


    
  });
  
  return  TabChildView;
  
});