// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'manual_requests_csrf_hack', //sends authentication token with POST PUT DELETE requires. Add $(document).trigger('csrfToken'); before sending manual $.post $.delete $.put requests
  'backbone',
  'router', // Request router.js
  'bootstrap',
  'marionettes/user/init',
], function($, _, mr_csrf, Backbone, Router, Bootstrap, GlobalUser){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  // Override Backbone.sync to add CSRF-TOKEN HEADER
  Backbone.sync = (function(original) {
    return function(method, model, options) {
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
      };
      original(method, model, options);
    };
  })(Backbone.sync);

  function checkPermition(type, id){
    _.each(GlobalUser.currentUser.abilities, function(ability){
      if ( ability.type == type && ability.id == id ){ 
        return true;
      }else{
        false
      }
    });
  }

  return { 
    initialize: initialize
  };
});
