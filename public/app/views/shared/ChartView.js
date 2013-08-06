define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts'
], function($, _, Backbone, hightcharts){

    var ChartView = Backbone.View.extend({
 
        initialize: function (){
            changes = this.collection.toJSON(); 
            
            chartArray = [];
            
            // here we convert json to format we need for highcharts  
            for (i=0; i<changes.length; i++){
                t = changes[i].change_time.split(/[- :]/);
                d = Date.UTC(t[0], t[1]-1, t[2]);
                chartArray[i]=[];
                chartArray[i][0]=d;
                chartArray[i][1]=changes[i].progress;   
            }
            
        },
        render:function(){
            $('#chart').highcharts({
            	
            	plotOptions: {
				    line: {
				        animation: false
				    }
				},
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