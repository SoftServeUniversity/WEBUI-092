/*
 * Цей View отримує при ініціалізації всі необхідні дані
 * для побудови вмісту табів і рендерить універсальний tabChildTemplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/tabChildTemplate.html'
], function($, _, Backbone, tabChildTemplate){   
   
  var TabChildView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(config){
      var data = this.buildJSON(config);
      this.render(data);
      

      
      

    },

    
    buildJSON: function(config){
    //loop through all entities
      var rel = {};
      var visible_fields = [];
        //loop through data
        for (i=0; i<config.data.length; i++) {  
          if (config.data[i]['src']){
             //console.log(config.data[i]['src'])
             var rel_link = config.data[i]['_link'];
               
             var rel_src = config.data[i]['src'];
               
             var obj = {};
              
             obj = rel_src;
               
             //array of foreign keys, mapped to collections
             rel[rel_link]=obj;
               
          }
          
          visible_fields.push(config.data[i]['_link'])
        }

        for (a=0; a<config.entity.length; a++){
           config.entity[a]['selectbox_items'] = []  

          for (var e_obj in config.entity[a]){
            if (e_obj in rel){    
              //console.log(rel[e_obj]);
              config.entity[a]['selectbox_items'].push(e_obj);
              config.entity[a][e_obj+'_collection'] = rel[e_obj];
              config.entity[a]['visible_fields'] = visible_fields;
            }
          }

        }
        
        data = {
         entities: config.entity
        };
        return data;
      
    },
    
    
    render: function (data){
      console.log(data);
      //console.log(config)
      var compiledTemplate = _.template(tabChildTemplate, data);
      this.$el.prepend(compiledTemplate);
      
      return this;
    },
    
  });
  
  return  TabChildView;
  
});