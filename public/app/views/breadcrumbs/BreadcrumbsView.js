define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/departments/DepartmentsCollection',
  'collections/courses/CoursesCollection',
  'collections/groups/GroupsCollection',
  'collections/teachers/TeachersCollection',
  'collections/students/StudentsCollection',
  'collections/work/WorkCollection',
  'collections/tasks/TasksCollection'

], function mainFunc($, _, Backbone, FacultiesCollection, 
  DepartmentsCollection, CoursesCollection, GroupsCollection, 
  TeachersCollection, StudentsCollection, WorksCollection, TasksCollection){

  var BreadcrumbsView =  Backbone.View.extend({
    initialize:function(){

      var place = location.hash;
      var page = place.slice(2);
      var index = page.indexOf('\/');
      var index_page = page.slice(index+1);
      var collType = page.substr(0, index);
      var current = "";
      var breadcrumbsObj = []; 
      var seen = {};

      function breadcrumbsFetch(){
        current.fetch({
          async:false,
          success:function () {
            var a = current.toJSON();

            for(var i = 0; i < a.length; i++){

              if(a[i].id == index_page){
                
              var arr = [];
              var cssClass = '';

                breadcrumbsObj.push(arr); 
                  
                if (a[i].work_id){
                  
                  current = new WorksCollection();
                  breadcrumbsFetch();
                  cssClass = "task";
                
                } else if(a[i].student_id){
                  
                  current = new StudentsCollection();
                  breadcrumbsFetch();
                  cssClass = "work";
                } else if(a[i].group_id){

                  current = new GroupsCollection();
                  breadcrumbsFetch();
                  cssClass = "student";

                } else if(a[i].degree){
                
                current = new DepartmentsCollection();
                breadcrumbsFetch();

                $('.breadcrumb a').find('.department').parent().nextAll().remove();

                  cssClass = "teacher";
                } else if(a[i].department_id){
                  current = new DepartmentsCollection();
                  breadcrumbsFetch();
                  cssClass = "group";
                } else if(a[i].faculty_id){
                  current = new FacultiesCollection();
                  breadcrumbsFetch();
                  cssClass = "department";
                }

                if(a[i].img){
                  cssClass = "faculty";
                  $('.breadcrumb a').find('.department').parent().prevAll().remove();
                }

                if(a[i].last_name){
                  arr.push(a[i].last_name+' '+a[i].name);
                } else if(a[i].name){
                  arr.push(a[i].name);
                } else{
                  return;
                }
                
                arr.push(a[i].id);

                arr.push(cssClass);
              }
            }
          }
        });
      }

      function breadcrumbsFind(){
  
        if(collType){
          str = collType.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          
          str = str.replace(/y$/, "ie");
          

          
          var collectionName = str+"sCollection";
          
              
          eval('current = new ' + collectionName + '()');
          
          breadcrumbsFetch();

            breadcrumbsShow();
        } else{
          return;
        }
        
      }
       

        if( 
            collType == 'faculty' || 
            collType == 'department' || 
            collType == 'course' ||
            collType == 'group' ||
            collType == 'teacher' ||
            collType == 'student' ||
            collType == 'work' ||
            collType == 'task'
          ){

            breadcrumbsFind();

          } else{
            $('.breadcrumb li').remove();
          }
          
        
  
      function breadcrumbsShow(){

        breadcrumbsObj.reverse();

        for(var i in breadcrumbsObj){
          var a = breadcrumbsObj[i][2]+"_"+breadcrumbsObj[i][1];
          var c = $('<li></li>');
          var b = $('<a></a>').html(breadcrumbsObj[i][0])
                    .attr('id', a)
                    .addClass(breadcrumbsObj[i][2]);
                    

            $('.breadcrumb').find('.'+breadcrumbsObj[i][2])
                      .html(breadcrumbsObj[i][0]).attr('id', a);

            var divider = $('<span>/</span>').addClass('divider');
            c.append(b).css('display', 'none');
            c.append(divider)

            $('.breadcrumb').append(c);
            $('.breadcrumb li').fadeIn(1000);
            $('.breadcrumb li').last().addClass('active');
             
        }

        $('.breadcrumb').find('.'+breadcrumbsObj[i][2]).parent().nextAll().remove();
        $('.breadcrumb').append(c);
        $('.breadcrumb li').fadeIn(1000);

        checkBreadcrumbs();

        $('.breadcrumb li span').css('display', 'inline');
        $('.breadcrumb li:last-child span').css('display', 'none');

        $('.breadcrumb').find('.'+collType).parent().nextAll('li').remove();

        $('header').find('button#main-header-button').on('click', function(){
          $('.breadcrumb li').remove();
          location.href = "#/";
        });
        $('.breadcrumb a').on('click', function(){
            var crumbClassValue = $(this).attr('id');
            var underscorePosition = crumbClassValue.indexOf('_');
            var locationPage = crumbClassValue.substr(0, underscorePosition);
            var numberPage = crumbClassValue.substr(underscorePosition+1);
            location.href = "/#/"+locationPage+"/"+numberPage;
            $(this).parent().nextAll('li').remove();
        });
      }

      function checkBreadcrumbs(){
        $('.breadcrumb a').each(function() {
          var txt = $(this).attr('class');
          if (seen[txt])
            $(this).parent().remove();
            
          else
            seen[txt] = true;
        });
      }  
     }
  });
  return BreadcrumbsView;
});