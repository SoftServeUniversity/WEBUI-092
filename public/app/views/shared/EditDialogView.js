define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/shared/editDialogTemplate.html'

], function($, _, Backbone, editDialogTemplate){   

var EditDialogView = Backbone.View.extend(
{
  el: '#content',
  el_modal: '#edit-modal',

  appended : true,


  initialize: function () {

    this.work_name = this.model.toJSON().name;
    this.templ = _.template(editDialogTemplate, {model: this.model.toJSON()});
    
    _.bindAll(this, 'cancelAction');
    _.bindAll(this, 'editElement');
    _.bindAll(this, 'keyPressHandler');

    
    this.render();
  },

  //remove events what remain from earlier calls to 'new removeDialogView()'
  events: {
    "click .confirm-yes" : "editElement",
    "click .confirm-no"  : "cancelAction",
    "keypress"  : "keyPressHandler"
  },      


  //to confirm removal with Enter
  keyPressHandler: function(e){
      if (e.keyCode == 13){
          this.editElement(); 
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

    this.model.set ({name: work_name});
    this.model.save(options);
    this.hideModal();
  }


  })
return EditDialogView;

});