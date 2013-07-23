define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts',
    'collections/faculties/FacultyChangeCollection'  
], function($, _, Backbone, hightcharts, FacultyChangeCollection){
	var t, d;
	var fac_changes = new FacultyChangeCollection();
		fac_changes.fetch({ url: "app/collections/faculties/facultyChangeCollection.json", async:false, success: function() {
		}});
	fac_changes = fac_changes.toJSON();	
	
/*
	 this is how array for chart is supposed to look 
     
     var chartJSON = [
        [Date.UTC(2013,  6, 3), 1],
        [Date.UTC(2013,  6, 4), 4],
        [Date.UTC(2013,  6, 8), 8],
     ];
*/
   
   	chartArray = [];
    // here we convert json to format we need for highcharts (look above for chartJSON)
        
    for (i=0; i<fac_changes.length; i++){
        t = fac_changes[i].change_time.split(/[- :]/);
        d = Date.UTC(t[0], t[1]-1, t[2]);
        chartArray[i]=[];
        chartArray[i][0]=d;
        chartArray[i][1]=fac_changes[i].progress;
        
    }
//	var t = "2010-06-09 13:12:01".split(/[- :]/);
//	var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);



    var ChartView = Backbone.View.extend({

        initialize: function (){
        },
        render:function(){

            $('#chart').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: null
                },
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    type: 'datetime'

                },
                yAxis: {
                    title: {
                        text: 'Percentage (%)'
                    },
                    min: 0,
                    max: 100
                },

                legend: {
                    enabled: false
                },
                series: [{
                    name:'Percentage',
                    data: chartArray
                }]
            })

            return this;
        }

    });
    return ChartView;
});