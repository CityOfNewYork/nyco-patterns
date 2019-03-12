'use strict';

const labels = ['1980', '1990', '2000', '2010', '2020'];

const data = [6542564, 7322564, 8008278, 8175133, 5175133];

const ChartData = {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      { // one line graph
        data: data,
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'pink',
          'purple',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)'
        ],
        borderColor: [
          '#36495d',
          'blue',
          'yellow',
          'pink',
          'purple',
          '#36495d',
          '#36495d',
          '#36495d',
        ],
        borderWidth: 3
      },
      { // another line graph
        label: 'Planet Mass (x1,000 km)',
        data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
        backgroundColor: [
          'rgba(71, 183,132,.5)', // Green
        ],
        borderColor: [
          '#47b784',
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    legend: {
      display: false,
    },
    lineTension: 1,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'New York City',
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Population',
        },
        ticks: {
          beginAtZero: true,
          padding: 25,
        }
      }]
    }
  }
}

export default ChartData;