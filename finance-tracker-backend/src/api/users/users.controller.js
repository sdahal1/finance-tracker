const usersService = require("./users.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "email", "password", "confirm_password");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "email",
  "password",
  "confirm_password"
];

function hasOnlyValidProperties(req,res,next){
  //destructure data from req.body
  const {data={}} = req.body;
  console.log(req.body)
  const invalidFields = Object.keys(data).filter(property=> !VALID_PROPERTIES.includes(property))
  if(invalidFields.length > 0){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`
    })
  }
  next();
}


async function userExists(req, res, next) {
  const { userId } = req.params;

  const user = await usersService.read(userId);

  if (user) {
    res.locals.user = user;
    return next();
  }
  next({ status: 404, message: `User cannot be found.` });
}


//full crud api methods
function list(req, res, next) {
  usersService
    .list()
    .then((data) => res.json({ users:data }))
    .catch(next);
}

function read(req,res,next){
  res.json({user: res.locals.user})
}


async function create(req, res, next) {
  const {data={}} = req.body;
  console.log(data)
  usersService
    .create(data)
    .then(newlyCreatedUser=>res.status(201).json({data:newlyCreatedUser}))
}

async function update(req, res, next) {
  const updatedUser = {
    ...res.locals.user,
    ...req.body.data,
    user_id: res.locals.user.user_id,
  };

  const data = await restaurantsService.update(updatedUser);

  res.json({ user:data });
}

async function destroy(req, res, next) {
  const {user_id} = res.locals.user;
  usersService
    .delete(user_id)
    .then(()=>res.sendStatus(204))
    .catch(next);
}


/* REGISTRATION SPECIFIC */
//check if email is taken
function confirmPwMatch(req,res,next){
  // console.log(req.body)
  function isValidString(input) {
    // Regular expression pattern
    const pattern = /^(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/;
    
    return pattern.test(input);
  }
  const {password, confirm_password} = req.body.data
  console.log(password,confirm_password)
  if(password !== confirm_password){
    return next({status: 400, password: "Password and Confirm Password must match"})
  }else if(password.length < 8 || !isValidString(password)){
    return next({status: 400, password: "Password must be at least 8 characters including 1 special character, and one number"})
  }
  next();
}
//password and confirm password must match

/* Login specific endpoints */

async function findUserByEmail(req,res,next){
  // console.log('req.params',req.params)
  const {email} = req.body;
  const user = await usersService.findByEmail(email);
  console.log("user", user)
  if (user) {
    res.locals.user = user;
    return next();
  }
  return next({ status: 404, message: `User with this email does not exist in our database.`})
}

async function checkPassword(req,res,next){
  console.log("checking password", req.body, res.locals.user.password)
  const {password} = req.body;
  const {user} = res.locals;
  if(String(user.password) != password){
    return next({status: 401, message: `Incorrect password. Try again.`})
  }

  return res.status(200).json({message: "correct!"})
  
}




module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
  create: [hasOnlyValidProperties, hasRequiredProperties, confirmPwMatch, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(userExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(userExists), asyncErrorBoundary(destroy)],
  login: [asyncErrorBoundary(findUserByEmail),asyncErrorBoundary(checkPassword), 
    // asyncErrorBoundary(login)
  ]
};