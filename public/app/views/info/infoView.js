define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/info/infoTemplate.html',
    'models/info/InfoModel'

], function($, _, Backbone, infoTemplate, InfoModel ){

    var InfoView = Backbone.View.extend({

        initialize:function(){
            var me = this;
            me.model = new InfoModel();
          
            var ajaxData = me.model.fetch({async:false, success: function(response){
                me.render(response.toJSON());
            }});
        },

        render:function(data){
            var compiledTemplate = _.template( infoTemplate, data);
            $("#content").html(compiledTemplate);
        }
    });
    return InfoView;
});