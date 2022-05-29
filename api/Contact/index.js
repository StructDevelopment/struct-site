module.exports = async function (context, req) {
  if (req && req.rawBody && req.rawBody.length < 3000) {
    console.log(req.body);
    context.res = {
      status: 201
    };
    
    return;
  }

  context.res = {
    status: 413
  };
}