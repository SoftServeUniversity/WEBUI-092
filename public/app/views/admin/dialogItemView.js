define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/admin/itemTemplate.html',
    'views/shared/RemoveDialogView'

], function ($, _, Backbone, ItemTemplate, RemoveDialogView) {

    var DialogItemView = Backbone.View.extend({


        tagName: 'tr',

        className: 'toggle-list',

        template: _.template(ItemTemplate),

        initialize: function(data){
            var me = this;

            this.data = data;
            this.model.on("destroy update", function(){ me.updateView() }, me);
        },

        events: {
            'click .delete-button'       : 'removeItem'
        },

        updateView: function(){
            this.remove();
        },


        removeItem: function(){
            var message = 'Ви дійсно бажаєте видалити '+ this.model.attributes.name + ' ?</strong>';
            var header = 'Підтвердіть видалення';
            var removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
        },

        render: function(){

            var me = this;

            me.data.model = me.model.toJSON();

            var compiledTemplate = me.template(me.data);

            me.$el.append(compiledTemplate);

            return me;

        }

    });

   return DialogItemView;
})