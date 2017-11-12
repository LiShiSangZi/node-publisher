'use strict';

module.exports = (app) => {
  app.all('/hook/merge', 'hook.merge');
};
