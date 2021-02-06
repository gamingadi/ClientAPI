const model = require("../DatabaseConfigure/model/model");
function auth(req, res, next) {
  if (req.params) {
    model.User.findOne({ email: req.params.email }, (err, result) => {
      if (err) console.log(err);
      if (result) {
        if (result.password === req.params.pass) {
          
          next()
        } else {
          return res
            .status(402)
            .json({
              error:{
                massage: "Invalid Password",
                status:400
              },
              Authentication: false,
            })
            .end();
        }
      } else {
        return res
          .json({
            error:{
              statusCode: 401,
              massage: "unAuthorized Request",
            }            
          })
          .status(402)
          .end();
      }
    });
  } else {
    return res.status(401).end();
  }
}
module.exports =auth;