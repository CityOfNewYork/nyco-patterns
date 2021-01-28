'use strict';

import Copy from '@nycopportunity/pttrn-scripts/src/copy/copy';
import Icons from '@nycopportunity/pttrn-scripts/src/icons/icons';
import Toggle from '@nycopportunity/pttrn-scripts/src/toggle/toggle';

import Select from '../elements/select/select';
import InputAutocomplete from '../elements/inputs/input-autocomplete';

import Feed from '../objects/feed/feed';
import ChartBar from '../objects/charts/chart-bar';
import ChartHorizontalBar from '../objects/charts/chart-horizontal-bar';
import ChartLine from '../objects/charts/chart-line';
import ChartPie from '../objects/charts/chart-pie';
/** import modules here as they are written */

/**
 * Methods for the main entry point
 */
class Default {
  /**
   * Method for the Copy utility
   *
   * @return  {Object}  Instance of Copy
   */
  copy() {
    return new Copy();
  }

  /**
   * Method for the Icons utility
   *
   * @param  {String}  path  The path of the icon file
   *
   * @return {Object}        Instance of Icons
   */
  icons(path) {
    return new Icons(path);
  }

  /**
   * Method for the Feed Object
   *
   * @param   {Object}  settings  Setting for the feed
   *
   * @return  {Object}            Feed instance
   */
  feed(settings) {
    return new Feed(settings);
  }

  /**
   * Method for the Toggle Utility
   *
   * @return  {Object}  Toggle instance
   */
  toggle(settings) {
    return new Toggle();
  }

  /**
   * Method for the Select Elements
   *
   * @return  {Object}  Select instance
   */
  select() {
    return new Select();
  }

  /**
   * Method for the Chart Objects
   *
   * @return  {Object}  Chart instance
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

  /**
   * Method for the Input Autocomplete Element
   *
   * @return  {Object}  Input Autocomplete instance
   */
  inputAutocomplete(settings = {}) {
    return new InputAutocomplete(settings);
  }

  /** add APIs here as they are written */
}

export default Default;
