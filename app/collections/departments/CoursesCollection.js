define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/CourseModel'
], function($, _, Backbone, CourseModel){

        return  Backbone.Collection.extend({
            model:CourseModel
        });

});
