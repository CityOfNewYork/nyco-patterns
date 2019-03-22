'use strict';

import Icons from '../elements/icons/Icons';
import Feed from '../objects/feed/Feed';
import Toggle from '../utilities/toggle/Toggle';
import Track from '../utilities/track/Track';

import ChartBar from '../objects/charts/chart--bar';
import ChartHorizontalBar from '../objects/charts/chart--horizontal-bar';
import ChartLine from '../objects/charts/chart--line';
import ChartPie from '../objects/charts/chart--pie';
/** import modules here as they are written */

/**
 * Methods for the global NycoPatterns instance
 */
class nyco {
  /**
   * Method for the Icons Element
   * @param  {String} path  The path of the icon file
   * @return {Object}       Icons instance
   */
  icons(path) {
    return new Icons(path);
  }

  /**
   * Method for the Feed Object
   * @param   {Object}  settings  Setting for the feed
   * @return  {Object}            Feed instance
   */
  feed(settings) {
    return new Feed(settings);
  }

  /**
   * Method for the Toggle Utility
   * @return  {Object} Toggle instance
   */
  toggle(settings) {
    return new Toggle();
  }

  /**
   * Method for the Track Module
   * @return  {Object} Track Module
   */
  track(settings) {
    return new Track();
  }

  /**
   * Method for the Chart Objects
   * @return  {Object} Chart instance
   */
  chart(type) {
    if (type === 'bar')
      return new ChartBar();

    if (type === 'horizontalBar')
      return new ChartHorizontalBar();

    if (type === 'line')
      return new ChartLine();

    if (type === 'pie')
      return new ChartPie();
  }
  /** add APIs here as they are written */
}

export default nyco;
