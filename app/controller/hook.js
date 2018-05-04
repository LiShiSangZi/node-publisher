'use strict';

async function publish(url, branch) {

}

exports.push = async ctx => {
  const request = ctx.request.body;
console.log(request)
  if (request.ref_type == 'tag' && request.repository) {
    const targetTag = request.ref;
    await ctx.service.publish.exec(request.repository.ssh_url,
      request.repository.name, targetTag);
    ctx.body = {
      "message": "Done",
    };
  } else {
    ctx.body = {
      "message": "Your message is not valid!",
    };
  }

};
