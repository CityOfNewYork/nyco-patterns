'use strict';

import Icons from '../elements/icons/Icons';
import Feed from '../objects/feed/Feed';
import Toggle from '../utilities/toggle/toggle';
import Chart from '../objects/chart/chart';
/** import modules here as they are written */

class nyco {
  /**
   * An API for the Icons Element
   * @param  {String} path  The path of the icon file
   * @return {Object}       instance of Icons element
   */
  icons(path) {
    return new Icons(path);
  }

  /**
   * An API for the Feed Element
   * @param   {Object}  settings  Setting for the feed
   * @return  {Object}            Feed element instance
   */
  Feed(settings) {
    return new Feed(settings).init();
  }

  toggle(settings) {
    return new Toggle().init();
  }

  chart() {
    return new Chart().init();
  }
  /** add APIs here as they are written */
}

export default nyco;
