'use strict';

import Feed from '../objects/feed/Feed';
/** import modules here as they are written */

class nyco {
  Feed(settings) {
    return new Feed(settings).init();
  }
  /** add APIs here as they are written */
}

export default nyco;
