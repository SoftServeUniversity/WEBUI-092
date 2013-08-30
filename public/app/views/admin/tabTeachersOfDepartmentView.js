define([
    'jquery',
    'underscore',
    'backbone',
    'views/admin/parentTabView',
    'models/teacher/TeacherModel',
    'collections/departments/DepartmentsCollection',
    'collections/teachers/TeachersCollection'

], function($, _, Backbone, ParentTabView, TeacherModel, DepartmentsCollection, TeachersCollection){

    var TabTeachersOfDepartmentView = ParentTabView.extend({

        collections_classes: {
            teachers    : TeachersCollection,
            departments : DepartmentsCollection
        },

        setConfig: function(){
            var me = this;
            var i= 0;

            var config = {

                model     : TeacherModel,
                collection: new TeachersCollection(_.filter(me.collections.teachers.models,
                    function(teacher){
                        if (teacher.get('verified')!=0){
                            teacher.set('number', ++i);
                            teacher.set('name',
                                teacher.get('last_name') + ' ' +
                                teacher.get('first_name') + ' ' +
                                teacher.get('middle_name'));
                        }
                        return teacher.get('verified')!=0
                    })),
                data     : [
                {
                    _link: 'number',
                    label: 'N',
                    type:  'text'
                },
                {
                    _link: 'name',
                    label: 'Ім\'я викладача',
                    type:  'text'
                },
                {
                    _link: 'degree',
                    label: 'Вчений ступінь/звання',
                    type:  'text'
                }
                ]

            };

            return config;
        },

        initialize: function(){
            //call parent's initialize method
            this.constructor.__super__.initialize.apply(this);
        }

    });

    return  TabTeachersOfDepartmentView;

});
