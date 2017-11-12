'use strict';

async function publish(url, branch) {

}

exports.push = async ctx => {
  const request = ctx.request.body;

  if (request.ref_type == 'tag' && request.repository &&
    request.repository.name) {
    const config = ctx.app.config.projects[request.repository.name];
    if (config) {
      const branch = config.branch;
      const targetTag = request.ref;
      console.log(request.repository.ssh_url, targetTag);
    }
  }

};
