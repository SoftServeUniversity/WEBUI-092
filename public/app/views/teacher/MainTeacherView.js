define([
    'jquery',
    'underscore',
    'backbone',
    'views/shared/ChartView',
    'views/teacher/TeacherAddWorkDialogView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'text!templates/teacher/teacherWorksTemplate.html',
    'collections/teachers/TeacherChangeCollection',
    'models/teacher/TeacherModel',
    'collections/work/WorkCollection'
], function($, _, Backbone,
            ChartView,
            TeacherAddWorkDialogView,
            mainTeacherTemplate,
            teacherWorksTemplate,
            TeacherChangeCollection,
            TeacherModel,
            WorkCollection){

    var TeacherView = Backbone.View.extend({

        initialize: function(id){
          var me = this;
          this.id = id;

          this.teacherModel = new TeacherModel();
          this.teacherModel.fetch({
            data: {
              filter: {
                id: this.id
              }
            },
            success: function() {
              me.trigger('DataLoaded', 'Teacher');
            }
          });

          this.worksCollection = new WorkCollection();
          this.worksCollection.fetch({
            data: {
              filter: {
                teacher_id: this.id
              }
            },
            success: function() {
              me.trigger('DataLoaded', 'Works');
            }
          });

          this.teacherChangeCollection = new TeacherChangeCollection();
          this.teacherChangeCollection.fetch({
            data: {
              filter: {
                progressable_id: this.id,
                progressable_type:'Teacher'
              }
            },
            success:function () {
              me.trigger('DataLoaded', 'TeacherChange');
            }
          });

          var isTeachLoaded = false;
          var isWorksLoaded = false;
          var isTeachChangeLoaded = false;

          this.on('DataLoaded', function (item) {
            if (item == 'Teacher') {
              isTeachLoaded = true;
            }

            if (item == 'Works'){
              isWorksLoaded = true;
            }

            if (item == 'TeacherChange'){
              isTeachChangeLoaded = true;
            }

            if ((isTeachLoaded && isTeachChangeLoaded && isWorksLoaded) == true){
              me.render();
            }
          });

          this.on('destroy', function(){
            me.off();
            me.remove();
          });

          this.worksCollection.on('add', function(){
            // Fill collection again from database
            me.worksCollection.fetch({
              async: false,
              data: {
                filter: {
                  teacher_id: this.id
                }
              },
              success: function() {
                // if success - re-render this view
                me.render();
              }
            });
          }, me);

        },

        render: function(){
          var teacher = this.teacherModel.toJSON()[0];

          var worksJSON = this.worksCollection.toJSON();

          var works = {};
          for (var i = 0; i < worksJSON.length; i++) {
            var course_name = worksJSON[i].student.course_name;
            if (!(course_name in works)){
              works[course_name] = [];
            }
            works[course_name].push(worksJSON[i]);
          };

          var dataForMainTeacherTemplate = {
            teacher: teacher,
            // Mark active link in teacher menu
            activeLink: "teacherWorksPage"
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherWorksTemplate = {
            works: works
          }
          var teacherWorksCompiledTemplate = _.template(teacherWorksTemplate, dataForTeacherWorksTemplate);
          $("#teacherPageContent").html(teacherWorksCompiledTemplate);

          var teacherAddWorkDialogView = new TeacherAddWorkDialogView(this.id, this.worksCollection, this);
          $("#teacherAddWorkDialogContent").html(teacherAddWorkDialogView.$el);

          var chartView = new ChartView({
            collection: this.teacherChangeCollection
          });
          chartView.render();

          return this;
        }
    });

    return TeacherView;
});