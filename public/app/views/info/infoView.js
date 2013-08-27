define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/info/infoTemplate.html',
    'models/info/InfoModel'

], function($, _, Backbone, infoTemplate, InfoModel ){

    var InfoView = Backbone.View.extend({

        initialize:function(){
            this.model = new InfoModel();
            var ajaxData = this.model.fetch({async:false});

            data = {
                content: ajaxData.responseText
            }

            this.render(data)
        },

        render:function(data){
            var compiledTemplate = _.template( infoTemplate, data);
            $("#content").html(compiledTemplate);
        }
    });
    return InfoView;
});