module.exports = async function (context, req) {
  if (req && req.rawBody && req.rawBody.length < 3000) {
    console.log(req.rawBody);
    context.res = {
      status: 201
    };

    return;
  }

  context.res = {
    status: 413
  };
}