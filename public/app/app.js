// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'backbone_relational',
  'router', // Request router.js
  'bootstrap',
], function($, _, Backbone, Backbone_relational, Router, Bootstrap){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
