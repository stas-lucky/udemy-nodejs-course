const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

//router.param("id", tourController.checkId);

router
  .route("/top-5-cheap")
  .get(tourController.getTop5Cheap, tourController.getAllTours);

router
  .route("/")
  .get(tourController.getAllTours)
  // Several middlewares
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
