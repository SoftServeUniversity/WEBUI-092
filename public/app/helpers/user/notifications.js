define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, bootstrap){

  var Notifications = function(){
    this.alert = function(alertType, message) {
      /*return HandlebarsTemplates['templates/shared/notifications']({
        'alertType': alertType,
        'message': message
      });*/
    },
    this.error = function(message) {
      return this.alert('error', message);
    },
    this.success = function(message) {
      return this.alert('success', message);
    }
  }

  /*
  Handlebars.registerHelper('notify_error', function(msg) {
    msg = Handlebars.Utils.escapeExpression(msg);
    return new Handlebars.SafeString(Notifications.error(msg));
  });

  Handlebars.registerHelper('notify_success', function(msg) {
    msg = Handlebars.Utils.escapeExpression(msg);
    return new Handlebars.SafeString(Notifications.success(msg));
  });
  */


  return Notifications;
});
