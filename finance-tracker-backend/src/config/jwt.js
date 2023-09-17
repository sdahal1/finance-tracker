const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;


module.exports.secret = secret;

// The "authenticate" function takes a few arguments, the request and response that we are familiar with, but it also takes the "next" function we've seen a few times already. The function then checks the "usertoken" cookie that should be present inside of the "cookies" object of request with the secret we used when signing it. We then add in a callback function that receives errors and a payload (the information stored in the cookie). If there are errors, we can reply with a 401 status code and pass back an object signifying the user attempting to access the route is not authenticated.
function authenticate(req,res,next){
  console.log('req.cookies in jwt.js', req.cookies);
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      console.log(err);
      res.status(401).json({verified: false});
    } else {
      next();
    } 
  });
}

module.exports.authenticate = authenticate;
