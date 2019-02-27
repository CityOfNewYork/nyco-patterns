'use strict';

import Icons from '../elements/icons/Icons';
import Feed from '../objects/feed/Feed';
import Toggle from '../utilities/toggle/Toggle';
import Track from '../utilities/track/Track';
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
}

export default nyco;
