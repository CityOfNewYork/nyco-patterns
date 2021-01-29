import ChartBar from '../objects/charts/chart-bar';
import ChartHorizontalBar from '../objects/charts/chart-horizontal-bar';
import ChartLine from '../objects/charts/chart-line';
import ChartPie from '../objects/charts/chart-pie';

class Charts {
  /**
   * Method for the Chart Objects
   *
   * @return  {Object}  Chart instance
   */
  init(type) {
    if (type === 'bar')
      return new ChartBar();

    if (type === 'horizontalBar')
      return new ChartHorizontalBar();

    if (type === 'line')
      return new ChartLine();

    if (type === 'pie')
      return new ChartPie();
  }
}

export default Charts;