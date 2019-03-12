<template>
  <div class='o-chart'>
    <h4 class='o-chart__title'>{{ chartTitle }}</h4>
      <div class='o-chart__chart'>
        <canvas id='chart' width='100%' height='100%'></canvas>
      </div>
  </div>
</template>

<style></style>

<script>
  import Chart from 'chart.js';

  // global defaults, can be overwritten in options
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.layout.padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 30
  };

  export default {
    props: ['chartData', 'chartTitle'],
    data() {
      return {
      };
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      },
    },
    mounted() {
      this.createChart('chart', this.chartData);
    },
  };
</script>