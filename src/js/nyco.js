'use strict';

import oCharts from './modules/o-charts';
/** import modules here as they are written */

class nyco {

  charts(settings, data) {
    return new oCharts(settings, data).init();
  }

  /** add APIs here as they are written */

}

export default nyco;