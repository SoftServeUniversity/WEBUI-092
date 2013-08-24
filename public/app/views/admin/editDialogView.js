define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'text!templates/admin/editDialogTemplate.html'
], function($, _, Backbone, ParentTabView, editDialogTemplate){   

var EditDialogView = Backbone.View.extend(
{
  el: '#content',
  el_modal: '#edit-modal',

  appended : true,


  initialize: function (model_id, collection) {
    this.model_id = model_id;
    this.collection = collection;

    this.model = collection.get(model_id);
    this.work_name = this.model.toJSON().name;
    this.templ = _.template(editDialogTemplate, {model: this.model.toJSON()});
    
    _.bindAll(this, 'cancelAction');
    _.bindAll(this, 'editElement');
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
    $('.confirm-yes').on('click', this.editElement);
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
	    $(this.el).append(this.templ);
	  }
	this.renderNamePlaceholder(); 
    this.showModal();     
	  return this;
  },

  renderNamePlaceholder: function(){
  	var me=this;
    $('#work_name').attr("placeholder",me.work_name)
  },

  cancelAction: function () {
    this.hideModal();
  },
  
  editElement: function (e) {
    var me=this;
    var model = this.collection.get(this.model_id);

    var options = {
        success: function (model, response) {
            console.log('remove success');
        },
        error: function (model, response) {
            console.log('remove error');
        }
    };
    var work_name = $('#work_name_input').val();
    var work_comment = $('#work_name_input').val();

    model.set ({name: work_name});
    model.save(options)
    this.removeZombieEvents()
  }


  })
return EditDialogView;

});