const jwt = require("jsonwebtoken");

function generateToken(user){
  const {user_id, first_name, last_name, email} = user;
  const payload = {
    user_id,
    first_name,
    last_name,
    email
  }

  const options = {
    expiresIn: '1h', //token expiration time
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken;