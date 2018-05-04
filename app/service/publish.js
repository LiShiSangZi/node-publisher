'use strict';

const uuid = require('uuid/v4');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('crow.pubsher.exec');

async function exec(command, parameter, options) {
  return new Promise((resolve, reject) => {
    const sp = childProcess.spawn(command, parameter, options);
    sp.stdout.on('data', data => {
      console.log(data.toString());
    });
    sp.stderr.on('data', data => {
      console.log(data.toString());
    });
    sp.on('exit', code => {
      console.log(`Child exited with code ${code}`);
      if (code < 1) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

/**
 * This is used to read/write user balance.
 */
module.exports = (app) => {
  class PushService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    async exec(address, name, tag) {
      const id = uuid();
      const dirName = `/tmp/${name}-${id}`;
      fs.mkdirSync(dirName);
      debug(`Created folder ${dirName}`);
      await exec('git', ['clone', address], {
        cwd: dirName,
      });
      debug(`Clone project ${name}`);
      const codePath = path.join(dirName, name);
      await exec('git', ['checkout', tag], {
        cwd: codePath,
      });
      debug(`Switch to tag ${tag}`);
      await exec('yarn', ['install'], {
        cwd: codePath,
      });
      debug(`Install dependency`);
      await exec(`npm`, ['publish'], {
        cwd: codePath,
        env: {
          HOME: '/root',
        },
      });
      debug('Publish!');
      await exec('rm', ['-rf', dirName], {

      });
      debug('Clean the tmp files. All Done!');
    }
  }
  return PushService
}
