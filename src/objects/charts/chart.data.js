'use strict';

const chartLabels = ['1980', '1990', '2000', '2010', '2020'];

const chartDataList = [6542564, 7322564, 8008278, 8175133, 5475133];

const ChartData = {
  data: {
    labels: chartLabels,
    datasets: [
      {
        data: chartDataList,
        fill: false, // used by line chart
        backgroundColor: [
          '#2F334F',
          '#3155A6',
          '#F2695D',
          '#EBBCD8',
          '#F9A137',
        ],
        borderColor: [
          '#ACAEB9'
        ],
        borderWidth: 1
      },
    ]
  },
  bar: {
    options: {
      title: {
        display: true,
        text: 'Population Chart',
      },
      legend: {
        display: false,
      },
      lineTension: 1,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Years',
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Population',
          },
          ticks: {
            padding: 25,
          }
        }]
      }
    }
  },
  horizontalBar: {
    options: {
      title: {
        display: true,
        text: 'Population Chart',
      },
      legend: {
        display: false,
      },
      lineTension: 1,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Population',
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Years',
          },
          ticks: {
            padding: 25,
          }
        }]
      }
    }
  },
  pie: {
    options: {
      title: {
        display: true,
        text: 'Population Chart',
      },
      legend: {
        display: true,
      },
      lineTension: 1,
    }
  }
}

export default ChartData;