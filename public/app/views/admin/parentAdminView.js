//parent of all admin views

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'bootstrap_datatables',
  'views/shared/MenuView',
  'text!templates/admin/parentAdminTemplate.html',
  'text!templates/admin/buttonsTemplate.html',
  'views/admin/itemView'

], function( $, bootstrapselect, _,  Backbone, Bootstrap_dataTables,
            MenuView, parentAdminTemplate, buttonsTemplate, ItemView ) {

  var ParentAdminView = Backbone.View.extend({

    el             : '#content',
    el_headline    : '#headline',
    el_tab_menu    : '#tab-menu',
    el_tab_content : '#tab-content',
    el_tab_buttons : '#tab-buttons',


    headline: 'Default Admin Headline',

    initialize: function(){
      
      var me = this;
      
      //because we extend events with events from children
      //(using addTabHandlers()), we need simple object to work with 
      this.events = JSON.parse(JSON.stringify(this.events));

      //extend events with events set in Child Admin Views
      me.addTabHandlers();

      me.render();

      //display default active tab set in Child Admin Views
      me.setActiveTab(me.defaultActiveTab);

      //Render a tab when it's loaded
      GlobalEventBus.on('tabSubViewLoaded', function(tabContent, config){
        me.config = config;
        
        me.collection = config.collection;

        me.renderTab(tabContent);
        me.renderButtons(config);

        $('.new-button').html(me.config.buttons['create']);
      })

    },

    events: {
     'click .save'               : 'closeModal',
     'click .open-modal-import'  : 'openModalImport',
     'click #newElement'         : 'appendNewElementRow'
    },

    //when page loads - load default tab
    setActiveTab: function(id){
      for(i=0; i<this.tabMenuConfig.length; i++){
        if(this.tabMenuConfig[i]['id'] == id){
          var action = this.tabMenuConfig[i]['action'];
          this[action]();
        }
      }
    },

    //add click handler for each tab
    addTabHandlers: function(){
      var me = this;
      _.each(this.tabMenuConfig, function (item){
        me.events['click #'+ item['id']] = item['action'];
      })
    },

    //add active class to tab menu
    addActiveClass: function(id){
      $('.nav-tabs *').removeClass('active').find('#'+id).addClass('active');
    },

    reloadTab: function () {
      $('.nav-tabs .active').trigger('click');
    },



    appendNewElementRow: function(){

      var me = this;
      
      if (this.$('#newElementRow').length < 1){
        
        var model = new me.config.model();
   
        var newElementView = new ItemView({model: model, conf: me.config, newModel: true});
        
        $(me.el_tab_content + ' table tbody').append(newElementView.render().el)
        
        this.newElementRow = true;   
      
      } else {

        $('#newElementRow').closest('tr').remove();
      
      }
    },
  


    hideAdminButtons: function(){
      $('.admin-buttons').css('display', 'none')
    },
    showAdminButtons: function(){
      $('.admin-buttons').css('display', 'block')
    },



    openModal: function(e){
      modal_id = ($(e.target).attr('data-target'));
      $('#'+modal_id).modal('show');
    },

    closeModal: function(){
      $('#manage-department').modal('hide');
      $('#manage-department-import').modal('hide');
    },

    openModalImport: function(){
      $('#manage-department-import').modal('show');
    },



    renderHeadline: function(headline){
      $(this.el_headline).append(this.headline);
    },

    renderMenu: function(){
      var menuView = new MenuView(this.tabMenuConfig);
      $(this.el_tab_menu).append(menuView.$el);
    },

    renderTab: function(tabContent){
     
      var me = this;
      $(me.el_tab_content).html(tabContent);
      me.addActiveClass(this.activeMenuId)

      
      $('.DataTable').dataTable({
        bDestroy: true,
        "oLanguage": {
          sUrl: "app/libs/datatables/dataTables.ukrainian.txt"
        }
      })
    
    },

    renderButtons: function(config){
      var compiledTemplate = _.template(buttonsTemplate, config);
      this.$(this.el_tab_buttons).html(compiledTemplate);
      this.showAdminButtons()
    },

    render: function (){
      
      var me = this;

      //render basic template with empty divs
      var compiledTemplate = _.template(parentAdminTemplate);
      this.$el.html(compiledTemplate);

      this.renderHeadline();
      this.renderMenu();

    }

  });

  return ParentAdminView;
});