const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });
  //console.log(tour);
  if (!tour) {
    k;
    return next(new AppError("There is no tour with that name", 404));
  }

  res.status(200).render("tour", {
    title: `${tour.name} tour`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: `Login into your account`,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render("account", {
    title: `Your account`,
  });
});

exports.submitUserData = catchAsync(async (req, res, next) => {
  // Using form
  //console.log("UPDATE", req.body);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  //console.log("UPDATE USER", updatedUser);
  res.status(200).render("account", {
    title: `Your account`,
    user: updatedUser,
  });
});
