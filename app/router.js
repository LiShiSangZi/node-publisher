'use strict';

module.exports = (app) => {
  app.post('/hook/push', 'hook.push');
};
