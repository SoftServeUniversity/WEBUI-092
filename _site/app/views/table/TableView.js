define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/table/TableTemplate.html',
  'collections/tables/TablesCollection'
], function($, _, Backbone, TableTemplate, TablesCollection){

  var TableView = Backbone.View.extend({
    el: $("#content"),

    render: function(){

      var that = this;

      var data_col = new TablesCollection();
      var data = {
        table: data_col.models,
        _: _        
      }
      var compiledTemplate = _.template( TableTemplate, {users: data});
     
      $("#content").html(compiledTemplate);
    }

  });

  return TableView;
  
});