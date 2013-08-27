define([

    'jquery',
    'underscore',
    'backbone',
    'collections/faculties/FacultiesCollection',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'collections/groups/GroupsCollection',
    'collections/teachers/TeachersCollection',
    'collections/students/StudentsProxyCollectionForTeacherPage'

], function mainFunc($, _, Backbone, FacultiesCollection, 
    DepartmentsCollection, CoursesCollection, GroupsCollection, 
    TeachersCollection, StudentsCollection){

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

                                if(a[i].department_id){
                                    current = new DepartmentsCollection();
                                    breadcrumbsFetch();
                                    cssClass = "group";

                                }else if(a[i].faculty_id){
                                    current = new FacultiesCollection();
                                    breadcrumbsFetch();
                                    cssClass = "department";
                                }
                                if(a[i].img){
                                    cssClass = "faculty";
                                }

                                arr.push(a[i].name);
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
                    console.log(str);
                    var collectionName = str+"sCollection";
                        
                    eval('current = new ' + collectionName + '()');
                    
                    breadcrumbsFetch();

                    breadcrumbsShow();
                }else{
                    return;
                }
                
            }

                breadcrumbsFind();
                
           
            

            function breadcrumbsShow(){

                breadcrumbsObj.reverse();

                for(var i in breadcrumbsObj){
                    var a = breadcrumbsObj[i][2]+"_"+breadcrumbsObj[i][1];
                    var b = $('<a></a>').html(breadcrumbsObj[i][0])
                                        .attr('id', a)
                                        .addClass(breadcrumbsObj[i][2])
                                        .css('display', 'none');

                        $('.wizard').find('.'+breadcrumbsObj[i][2])
                                            .html(breadcrumbsObj[i][0]).attr('id', a);
                        $('.wizard').append(b);
                        $('.wizard a').fadeIn(1000);
                        
                }

                $('.wizard').find('.'+breadcrumbsObj[i][2]).nextAll().remove();
                $('.wizard').append(b);
                $('.wizard a').fadeIn(1000);
                
                checkBreadcrumbs();
                
                $('.wizard').find('.'+collType).nextAll().remove();

                $('header').find('button#main-header-button').on('click', function(){
                    $('.wizard a').remove();
                    location.href = "#/";
                });
                $('.wizard a').on('click', function(){
                        var crumbClassValue = $(this).attr('id');
                        var underscorePosition = crumbClassValue.indexOf('_');
                        var locationPage = crumbClassValue.substr(0, underscorePosition);
                        var numberPage = crumbClassValue.substr(underscorePosition+1);
                        location.href = "/#/"+locationPage+"/"+numberPage;
                        $(this).nextAll('a').remove();
                });
            }
            function checkBreadcrumbs(){
                $('.wizard a').each(function() {
                    var txt = $(this).attr('class');
                    if (seen[txt])
                        $(this).remove();
                    else
                        seen[txt] = true;
                });
            }  
         }
    });
    return BreadcrumbsView;
});