define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/shared/EditTaskDialogue.html'

], function($, _, Backbone, EditTaskDialogue){   

var EditTaskDialogView = Backbone.View.extend(
{
  el: '#content',
  el_modal: '#task-edit-modal',

  appended : true,


  initialize: function () {

    this.work_name = this.model.toJSON().name;
    console.log(this.work_name)
    this.templ = _.template(EditTaskDialogue, {model: this.model.toJSON()});
    
    _.bindAll(this, 'cancelAction');
    _.bindAll(this, 'editElement');
    _.bindAll(this, 'keyPressHandler');

    
    this.render();
  },

  //remove events what remain from earlier calls to 'new removeDialogView()'
  events: {
    "click .confirm-yes" : "editElement",
    "click .confirm-no"  : "cancelAction",
    "keypress"           : "keyPressHandler"
  },      


  //to confirm removal with Enter
  keyPressHandler: function(e){
      if (e.keyCode == 13){
          this.editElement(); 
    }
  },

  validateComment: function(){
    if ($("#task_comment_input").val().length < 5) {
      return false;
    } else {
      return true
    }
  },
  displayError: function(){
    $(".control-group.comment").addClass('error');
  },

  hideModal: function () {
    $(this.el_modal).modal('hide');
  },
  showModal: function () {
    $(this.el_modal).modal('show');
    $('#task_name_input').val('');
    $('#task_comment_input').val('');
  },

  render: function () {
    if($(this.el_modal).length == 0){
	    $(this.el).append(this.templ);
	  }
	  this.renderNamePlaceholder(); 
    this.showModal();     
	  return this;
  },

  renderNamePlaceholder: function(){
  	var me = this;
    $('#task_name_input').attr("placeholder",me.work_name);
    console.log("Placeholder changed");
  },

  cancelAction: function () {
    this.hideModal();
  },
  
  editElement: function (e) {
    var me = this;

    var options = {
        success: function (model, response) {
          console.log('remove success');
        },
        error: function (model, response) {
          console.log('remove error');
        }
    };
    var work_name = $('#task_name_input').val();
    var work_comment = $('#task_name_input').val();
    
    if(this.validateComment()){

      this.model.set ({name: work_name});
      this.model.save(options);
      this.hideModal();  
    
    } else {

      this.displayError();
    
    };
    

  }


  })
return EditTaskDialogView;

});