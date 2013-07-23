define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  
  var Test = [
    {'0': 'Andrew'}, 
    {'1': 'Yana'},
    {'2': 'SomeOneElse'}
  ]
  

  var TablesCollection = function(){
    return new Backbone.Collection(Test);
  }
  return TablesCollection;
});
