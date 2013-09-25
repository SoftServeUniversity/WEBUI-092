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
        t = changes[i].created_at.split(/[- T]/);
        d = Date.UTC(t[0], t[1]-1, t[2]);
        chartArray[i]=[];
        chartArray[i][0]=d;
        chartArray[i][1]=changes[i].progress;   
      }
      
    },
    render:function(){
      Highcharts.setOptions({

        lang: {
          loading: 'Aguarde...',
          months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
          weekdays: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Cубота', 'Неділя'],
          shortMonths: ['Січ', 'Лют', 'Бер', 'Квіт', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
          exportButtonTitle: "Exportar",
          printButtonTitle: "Imprimir",
          rangeSelectorFrom: "De",
          rangeSelectorTo: "Até",
          rangeSelectorZoom: "Periodo",
          downloadPNG: 'Download imagem PNG',
          downloadJPEG: 'Download imagem JPEG',
          downloadPDF: 'Download documento PDF',
          downloadSVG: 'Download imagem SVG'
        }
      });


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
            text: ''
          },
          type: 'datetime'

        },
        yAxis: {
          title: {
            text: 'Оцінка виконаної роботи, %'
          },
          min: 0,
          max: 100
        },

        legend: {
          enabled: false
        },
        tooltip: {
          dateTimeLabelFormats: {
            week:"%A, %B %e, %Y"
          }
          
        },

        series: [{
          name:'Відсоток виконання',
          data: chartArray
        }]
      })

      return this;
    }

  });
  return ChartView;
});