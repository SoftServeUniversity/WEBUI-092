define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/teachersProxyCollection',
  'collections/students/StudentsProxyCollection',
  'text!templates/search/SearchTemplate.html',
  'bootstrapselect',
  'bootstrap_datatables'


], function ($, _, Backbone, FacultiesCollection, CoursesCollection, TeachersCollection, StudentsCollection, SearchTemplate, bootstrapselect, datatables){

  var SearchView =  Backbone.View.extend({

    initialize:function(){
              $('#ui-id-1 a').on('click', function(){
                $(this).fadeIn('fast');
              });

      var compiledTemplate = _.template( SearchTemplate );
      $("#content").html(compiledTemplate);
      $('select').selectpicker();
      var studCollection = new StudentsCollection();
      var teachCollection = new TeachersCollection();
      var teachObj = [];
      var studObj = [];
      var f_id = "";
      var c_id = "";

      $('button[data-id = faculty_select]').removeClass('btn-default').addClass('btn-info btn-mini');
      $('button[data-id = course_select]').removeClass('btn-default').addClass('btn-success btn-mini');
      $('html').click(function() {
        $('#select-box div.dropdown-menu').hide();
      });

      $('button[data-id = faculty_select], button[data-id = course_select]').on('click', function(){
        $(this).siblings('div.dropdown-menu').fadeToggle();
      });
      
      $('#select-box div.dropdown-menu').click(function(){
        if($(this).siblings('button[data-id = faculty_select]')){
          if($(this).find('li').first().attr('selected')){
            f_id = null;
          }else{
            f_id = $(this).find('li[class = selected] a').attr('data-val');
          }

        }else if($(this).siblings('button[data-id = course_select]')){
          if($(this).find('li').first().attr('selected')){
            c_id = null;
          }else{
            c_id = $(this).find('li[class = selected]').find('a').attr('data-val');
          }
        }

      });
      $('.searchDataTable').dataTable({
        bDestroy: true,
        "oLanguage": {
          sUrl: "app/libs/datatables/searchDataTables.ukrainian.txt"
        }
      })
      $('#search-block').click(function(event){
          event.stopPropagation();
          $('#select-box').show();
          
      });
      $(window).on('hashchange', function() {
        $('#select-box').hide();
          $('#search-field').val("");
      });
      function getJSON(collection, obj){
        collection.fetch({
          async:false,
          success:function () {
            obj.push(collection.toJSON());
            return obj;
          }

        });
        return obj;
      }


      function getFacultyJSON(){
        var facultiesCollection = new FacultiesCollection();
        facultiesCollection.fetch({
          async:false,
          success:function (result) {
            var facul = result.toJSON();
            for(var i in facul){
              var option = $('<a></a>').attr('data-val', facul[i].id).html(facul[i].name);
              var li = $("<li></li>").html($(option));
              $('button[data-id = faculty_select] + div.dropdown-menu').find('ul').append(li);
            }
          }
        });
      }

      function getCourseJSON(){
        var coursesCollection = new CoursesCollection();
        coursesCollection.fetch({
          async:false,
          success:function (result) {
            var course = result.toJSON();
            for(var i in course){
              var option = $('<a></a>').attr('data-val', course[i].id).html(course[i].name);
              var li = $("<li></li>").html($(option));
              $('button[data-id = course_select] + div.dropdown-menu').find('ul').append(li);
            }
          }
        });
      }
      
      getFacultyJSON();
      getCourseJSON();
     
     $("#dropList").change(function() {
        var value = $("#dropList").val();
        $.get("getValues.php", {a: value}, function(data) {
            $("#showMY").append('<li><a href="#">' + data + '</a></li>');
            if($("#showMY li").length > 10) {
                $("#showMY li:first:visible").hide();
            }
        });
    });

      $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
      });
      $('button[data-id = course_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = course_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
      });
            getJSON(studCollection, studObj);
            getJSON(teachCollection, teachObj);

          var people = [];
            people = teachObj[0].concat(studObj[0]);
          var str = JSON.stringify(people);
          var parsed = JSON.parse(str, function(k, v) {
              if (k === "name")
                  this.label = v;
              else
                  return v;
          });
          
          $( "#search-field" ).autocomplete({
            minLength: 2,
            source: parsed,
            focus: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label );

              return false;
            },
            select: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label );
              if(ui.item.epartment_id){
                location.href = '#/teacher/'+ui.item.id;
              }else{
                location.href = '#/student/'+ui.item.id;
              }
              return false;
            }
          })
          .data( "ui-autocomplete" )._renderItem = function( ul, item ) {

              if(item.department_id){
                var href = '#/teacher/'+item.id;
                var status = '<span class="status">викладач</span>';
              }else{
                var status = '<span class="status">cтудент</span>';
                var href = '#/student/'+item.id;
              }
            if(("#ui-id-1 li").length > 1){
                $("#ui-id-1 li").eq(3).nextAll().remove();
            }
            var searchInfo = $('<span></span>').addClass('searchInfo').html('');
            var a = $('<a>' + item.label +" "+status);
            return $( "<li>" ).append(a).appendTo( ul );
          };
     }
  });
  return SearchView;
});