define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/DepartmentModel'
], function($, _, Backbone, DepartmentModel){

    var DepartmentsCollection = Backbone.Collection.extend({
        model:DepartmentModel,

        url: "app/mocks/departments.json",
        //url: "/departments",
        /*  filtered = this.filter(function(item) {
            return item.get("faculty_id") == faculty_id;
          });
          return new DepartmentsCollection(filtered);
        }*/


    });

    return DepartmentsCollection;

});