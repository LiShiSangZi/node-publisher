'use strict';

const chalk = require('chalk');
const mock = require('egg-mock');
const uuidV4 = require('uuid/v4');
const url = process.argv[2];
const name = process.argv[3];
const tag = process.argv[4];
if (!url) {
  console.error('Please input the project url.');
  process.exit(1);
}
if (!tag) {
  console.error('Please input the project tag.');
  process.exit(1);
}
if (!name) {
  console.error('Please input the project name.');
  process.exit(1);
}

const exec = async() => {

  const app = mock.app();

  await app.ready();
  const ctx = app.mockContext();

  try {
    await ctx
      .service
      .publish
      .exec(url, name, tag);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log(chalk.red(`The schedule job ${name} does not exist.`));
    }
  }

};

const run = exec().then(r => {
  console.log('done.');
  process.exit(0);
}).catch(f => {
  console.error(f);
  process.exit(1);
});
