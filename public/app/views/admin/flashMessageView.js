define([
  'jquery',
  'underscore',
  'backbone'

], function($, _,  Backbone){   

var FlashMessage = Backbone.View.extend({

  tagName: 'div',
  template: "<div class='flash'><%=flash %></div>",
    
  initialize: function(msg) {
    this.msg = msg;
    //Dispatcher.bind('show_flash_message', this.render);
    this.render('message blah blah');
  },

  render: function(msg) {
    var data = {
      flash : 'msg'
    }
    var compiledTemplate = _.template(this.template);
  }

});