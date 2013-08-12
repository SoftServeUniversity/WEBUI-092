define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/tabChildView',
  'text!templates/admin/removeDialogTemplate.html'
], function($, _, Backbone, TabChildView, removeDialogTemplate){   

var RemoveDialogView = Backbone.View.extend(
{
  el: '#content',
  el_modal: '#delete-modal',

  appended : true,


  initialize: function (model_id, collection) {
    this.model_id = model_id;
    this.collection = collection;
    this.templ = _.template(removeDialogTemplate);
    
    _.bindAll(this, 'cancelAction');
    _.bindAll(this, 'removeElement');

    this.render();
    this.removeZombieEvents();
    this.addEventHandlers();
  },

  removeZombieEvents: function () {
      $('.confirm-yes').off('click');
      $('.confirm-no').off('click');
  },

  addEventHandlers: function () {
    $('.confirm-yes').on('click', this.removeElement);
    $('.confirm-no').on('click', this.cancelAction);
  },


  hideModal: function () {
    $(this.el_modal).modal('hide');
  },
  render: function () {
    if($(this.el_modal).length==0){
	    $(this.el).append(this.templ());
	  } 
    $(this.el_modal).modal('show');
     
	  return this;
  },


  cancelAction: function () {
    this.hideModal();
  },
  
  removeElement: function () {
    var model = this.collection.get(this.model_id);

    var options = {
        success: function (model, response) {
            console.log('remove success');
        },
        error: function (model, response) {
            console.log('remove error');
        }
    };

    model.destroy(options);
    this.collection.remove(model);


    this.hideModal();
  }


  })
return RemoveDialogView;

});