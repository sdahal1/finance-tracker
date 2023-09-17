const router = require("express").Router({ mergeParams: true });
const controller = require("./users.controller");


// const theatersRouter = require("../theaters/theaters.router");
// const reviewsRouter = require("../reviews/reviews.router");

// router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
// router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

const methodNotAllowed = require("../../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/login")
  .post(controller.login)
  .all(methodNotAllowed)

router
  .route("/getLoggedInUser")
  .get(controller.getLoggedInUser)
  .all(methodNotAllowed)

  
router
  .route("/:userId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
