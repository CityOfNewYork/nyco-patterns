'use strict';

import Copy from '@nycopportunity/pttrn-scripts/src/copy/copy';
import Dialog from '@nycopportunity/pttrn-scripts/src/dialog/dialog';
import Forms from '@nycopportunity/pttrn-scripts/src/forms/forms';
import Icons from '@nycopportunity/pttrn-scripts/src/icons/icons';
import Toggle from '@nycopportunity/pttrn-scripts/src/toggle/toggle';
import Autocomplete from '@nycopportunity/pttrn-scripts/src/autocomplete/autocomplete';

import Feed from '../objects/feed/feed';
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
  feed(settings = {}) {
    return new Feed(settings);
  }

  /**
   * Method for the Toggle Utility
   *
   * @param   {Object}  settings  Setting for the toggle
   *
   * @return  {Object}  Toggle instance
   */
  toggle(settings = {}) {
    return new Toggle(settings);
  }

  /**
   * Method for the Input Autocomplete Element
   *
   * @param   {Object}  settings  Setting for the autocomplete
   *
   * @return  {Object}  Input Autocomplete instance
   */
  autocomplete(settings = {}) {
    return new Autocomplete(settings);
  }

  /**
   * Method for Form validation
   *
   * @param  {string}    selector
   *
   * @param  {function}  submit
   */
  valid(selector, submit) {
    this.form = new Forms(document.querySelector(selector));

    this.form.submit = submit;

    this.form.selectors.ERROR_MESSAGE_PARENT = '[data-js*="question-container"]';

    this.form.watch();
  }

  /**
   * [dialog description]
   *
   * @return  {[type]}  [return description]
   */
  dialog() {
    return new Dialog();
  }
}

export default Default;
