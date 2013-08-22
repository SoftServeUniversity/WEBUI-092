define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'text!templates/admin/removeDialogTemplate.html'
], function($, _, Backbone, ParentTabView, removeDialogTemplate){   

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
    _.bindAll(this, 'keyPressHandler');


    this.render();
    this.addEventHandlers();
  },

  //remove events what remain from earlier calls to 'new removeDialogView()'
  removeZombieEvents: function () {
      $('.confirm-yes').off('click');
      $('.confirm-no').off('click');
      $(document).off('keypress', this.keyPressHandler);
  },

  //when using event object there was no way to remove zombie events.
  //assigning events manually works better
  addEventHandlers: function () {
    $('.confirm-yes').on('click', this.removeElement);
    $('.confirm-no').on('click', this.cancelAction);
    $(document).on('keypress', this.keyPressHandler);
  },


  //to confirm removal with Enter
  keyPressHandler: function(e){
      if (e.keyCode == 13){
          this.removeElement(); 
    }
  },

  hideModal: function () {
    $(this.el_modal).modal('hide');
  },
  showModal: function () {
    $(this.el_modal).modal('show');
  },

  render: function () {
    if($(this.el_modal).length==0){
	    $(this.el).append(this.templ());
	  } 
    this.showModal();     
	  return this;
  },


  cancelAction: function () {
    this.hideModal();
  },
  
  removeElement: function (e) {
    console.log(this)
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

    $('.nav-tabs .active').trigger('click')
    this.hideModal();


    this.removeZombieEvents()
  }


  })
return RemoveDialogView;

});