//landing.component.js
angular
  .module('rsp.core')
  .component("landing", {
    controller: landingController,
    templateUrl: 'app/landing/landing.html'
  });


function landingController() {
  var
    ctrl = this;

    ctrl.$onInit = function() {
      var date = new Date();
      ctrl.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();

      //chart 1
      Highcharts.chart('#ptChart1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor:'transparent',
            height: '350px'
        },
        title: {
            text: '<span style="font-size:48px;line-height:52px;">23/3</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 70
        },
        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                colors: [
                  '#ff9800',
                  '#17b0f4'
                ],
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '135%'
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            data: [
                ['Active', 23],
                ['Expired', 3]
            ]
        }]
      });


      //ptChart2
      Highcharts.chart('#ptChart2', {
            chart: {
                type: 'bar',
                backgroundColor:'transparent'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: ['Below Buffer', 'At Max Return', 'Autocall', 'Above Barrier'],
                title: {
                    text: null
                },
                labels: {
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    },
                    color: '#ff9800'
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                data: [4, 5, 9, 2]
            }]
        });
    };
}