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
    'collections/work/WorksCollectionOfTeacher'
], function($, _, Backbone,
            ChartView,
            TeacherAddWorkDialogView,
            mainTeacherTemplate,
            teacherWorksTemplate,
            TeacherChangeCollection,
            TeacherModel,
            WorksCollectionOfTeacher){

    var TeacherView = Backbone.View.extend({

        initialize: function(id){
          var that = this;
          this.id = id;

          this.teacherModel = new TeacherModel();
          this.teacherModel.fetch({
            data: {
              filter: {
                id: this.id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Teacher');
            }
          });

          this.worksCollection = new WorksCollectionOfTeacher();
          this.worksCollection.fetch({
            data: {
              filter: {
                teacher_id: this.id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Works');
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
              that.trigger('DataLoaded', 'TeacherChange');
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
              that.render();
            }
          });

          this.on('destroy', function(){
            me.off();
            me.remove();
          });
        },

        render: function(){
          var teacher = this.teacherModel.toJSON()[0];

          var worksJSON = this.worksCollection.toJSON();
          //console.log(worksJSON);

          var works = {};
          for (var i = 0; i < worksJSON.length; i++) {
            var course_name = worksJSON[i].course_name;
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

          var teacherAddWorkDialogView = new TeacherAddWorkDialogView(this.id);
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