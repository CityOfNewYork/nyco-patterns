<script>
  import { Pie, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  Chart.defaults.global.title.padding = 20;
  Chart.defaults.global.title.fontSize = 16;
  Chart.defaults.global.title.lineHeight = 1.6;

  export default {
    extends: Pie,
    mixins: [reactiveProp],
    props: {
      options: {
        type: Object,
        default() {
          return {
            legend: {
              display: true,
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