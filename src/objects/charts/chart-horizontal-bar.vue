<script>
  import { HorizontalBar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  Chart.defaults.global.title.padding = 20;
  Chart.defaults.global.title.fontSize = 16;
  Chart.defaults.global.title.lineHeight = 1.6;

  export default {
    extends: HorizontalBar,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default() {
          return {
            legend: {
              display: false,
            },
            lineTension: 1,
          }
        }
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options);
    },
  };
</script>