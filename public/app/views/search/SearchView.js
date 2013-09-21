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
      //$('.searchDataTable tbody tr').remove();
      //$('#DataTables_Table_0 tbody tr').remove();
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
          data: {search: 'true', two_last_name: 'Chyr'},
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
     

      $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
        $('#search-container div.dropdown-menu').hide();
      });

      $('button[data-id = course_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = course_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
        $('#search-container div.dropdown-menu').hide();
      });

      $("button[data-id = course_select] + div.dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('button[data-id = course_select]').html(selText);
      });

      $("button[data-id = faculty_select] + div.dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('button[data-id = faculty_select]').html(selText);
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
          console.log(parsed);

          $('#searchFormButton').on('click', function(){
          
          if($('#search-field').val().length > 1){
            //$('#DataTables_Table_0 tbody tr').remove();
              for(var l in parsed){
                if(parsed[l].degree){
                  var st = 'викладач';
                  var statusClass = 'teacher';
                  var course = "-";
                }else{
                  var st = 'студент';
                  var statusClass = 'student';
                  var course = parsed[l].course_name;
                }
                var names = parsed[l].label.split(/[ ]+/);
                console.log(names);
                var tr = $('<tr></tr>').attr('data-id', '#/'+statusClass+"/"+parsed[l].id)
                                        .append($('<td>'+(parseInt(l)+1)+'</td>'))
                                        .append($('<td>'+parsed[l].last_name+'</td>'))
                                        .append($('<td>'+names[0]+'</td>'))
                                        .append($('<td>'+parsed[l].middle_name+'</td>'))
                                        .append($('<td>'+parsed[l].faculty_name+'</td>'))
                                        .append($('<td>'+parsed[l].department_name+'</td>'))
                                        .append($('<td>'+course+'</td>'))
                                        .append($('<td>'+st+'</td>'));
                                        
                $('.searchDataTable tbody').append(tr);
              }
              $('.searchDataTable').dataTable({
              bDestroy: true,
              "oLanguage": {
                sUrl: "app/libs/datatables/searchDataTables.ukrainian.txt"
              }
            });
          }
          });         
          $('#DataTables_Table_0 tbody tr').on('click', function(){
            location.href = $(this).attr('data-id');
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