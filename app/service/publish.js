'use strict';

/**
 * This is used to read/write user balance.
 */
module.exports = (app) => {
  class PushService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    async exec(address, tag) {

    }
  }
  return PushService
}