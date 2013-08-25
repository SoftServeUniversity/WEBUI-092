define([
  //put it on top (it has to be loaded before bootstrap-wysihtml5 starts loading)
  'libs/bootstrap_wysihtml5/js/wysihtml5-0.3.0.min',
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/tabInfoTemplate.html',
  'models/InfoModel',
  'libs/bootstrap_wysihtml5/js/bootstrap-wysihtml5',
  'libs/bootstrap_wysihtml5/locales/bootstrap-wysihtml5.ua-UA'

], function(wysiwig, $, _, Backbone, tabInfoTemplate, InfoModel){

  var TabInfoView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      var me = this;
      
      this.model = new InfoModel();
      ajaxData = this.model.fetch({async:false});
      this.model.set({content: ajaxData.responseText});
      this.render();
    
      GlobalEventBus.on('infoChanged', function(content){
        me.updateInfo(content)
      }, this)
    },

    render: function (){
      var me = this;
      var compiledTemplate = _.template(tabInfoTemplate, me.model.toJSON());
      this.$el.html(compiledTemplate);
    },

    updateInfo: function(content){
      var me = this;

      //event throttling
      if (me.timeout) {clearTimeout(me.timeout)} 
      me.timeout = window.setTimeout(function(){
        me.model.set({content: content})
        me.model.save();
      }, 400)

    }

  });

  return  TabInfoView;

});