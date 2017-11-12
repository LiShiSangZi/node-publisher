'use strict';

async function publish(url, branch) {
  
}

exports.push = async ctx => {
  const request = ctx.request.body;

  console.log(request);

  if (request.repository && request.repository.name) {
    const config = ctx.app.config.projects[request.repository.name];
    if (config) {
      const branch = config.branch;
      if (request.ref === `refs/heads/${branch}`) {

      }
    }
  }

};
