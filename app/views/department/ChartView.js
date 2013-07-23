define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts'

], function($, _, Backbone, hightcharts){
    var chartJSON = [
        [Date.UTC(2013,  6, 3), 1],
        [Date.UTC(2013,  6, 4), 4],
        [Date.UTC(2013,  6, 8), 8],
        [Date.UTC(2013,  6, 12), 21],
        [Date.UTC(2013,  6, 14), 15],
        [Date.UTC(2013,  6, 17), 35],
        [Date.UTC(2013,  6, 22), 41],
        [Date.UTC(2013,  6, 25), 63],
        [Date.UTC(2013,  6, 30), 75]
    ];
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
                    data: chartJSON
                }]
            })

            return this;
        }

    });
    return ChartView;
});