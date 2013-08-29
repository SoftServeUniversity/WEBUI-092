
define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'text!templates/admin/removeDialogTemplate.html'
], function($, _, Backbone, ParentTabView, removeDialogTemplate){

  var RemoveDialogView = Backbone.View.extend({
    
    el: '#content',
    el_modal: '#delete-modal',

    initialize: function (model, data) {
      this.data = data;
      this.template = _.template(removeDialogTemplate);

      _.bindAll(this, 'cancelAction');
      _.bindAll(this, 'removeElement');
      _.bindAll(this, 'keyPressHandler');

      $(document).on('keypress', this.keyPressHandler);

      this.render();
    },

    events : {
      'click .confirm-yes' : 'removeElement',
      'click .confirm-no' : 'cancelAction'
    },

    //to confirm removal with Enter
    keyPressHandler: function(e){
        if (e.keyCode == 13){
            this.removeElement();
      }
    },

    hideModal: function () {
      $(this.el_modal).modal('hide');
      this.unLink();
    },

    showModal: function () {
      $(this.el_modal).modal('show');
    },

    render: function () {
      if($(this.el_modal).length==0){

        $(this.el).append(this.template(this.data));
  	  }
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
      this.model.destroy();

      $('.nav-tabs .active').trigger('click')
      this.hideModal();
    }

  })
return RemoveDialogView;

});