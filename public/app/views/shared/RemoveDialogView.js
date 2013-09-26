
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/shared/removeDialogTemplate.html'

], function($, _, Backbone, removeDialogTemplate){

  var RemoveDialogView = Backbone.View.extend({

    el: 'body',
    el_modal: '#delete-modal',

    initialize: function (model, data) {
      this.data = data;
      this.template = _.template(removeDialogTemplate);
      _.bindAll(this, 'cancelAction');
      _.bindAll(this, 'removeElement');

      this.render();
    },

    events : {
      'click .confirm-yes' : 'removeElement',
      'click .confirm-no' : 'cancelAction'
    },

    hideModal: function () {
      console.log(this)
      $('#delete-modal').modal('hide');
      this.unLink();
    },

    showModal: function () {
      $('#delete-modal').modal('show');
    },

    render: function () {
      if(this.$el.find('#delete-modal').length==0){
        $(this.el).append(this.template(this.data));
      }
      $('#delete-modal_header').html(this.data.header);
      $('#delete-modal_message').html(this.data.message);
      this.showModal();
      return this;
    },

    unLink: function(){
      this.undelegateEvents();
    },

    cancelAction: function () {
      this.hideModal();
    },

    removeElement: function (e) {
      this.model.destroy({
        wait: true,
        success: function() {
        }
      });
      this.hideModal();
    }

  })

  return RemoveDialogView;

});