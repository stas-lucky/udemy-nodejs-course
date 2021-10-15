//const fs = require("fs");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// const getTourByIdParam = (req) => {
//   const id = req.params.id * 1; // Use "* 1" to convert to number
//   return tours.find((t) => t.id === id);
// };

// exports.checkId = (req, res, next, val) => {
//   const tour = getTourByIdParam(req);
//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid Id",
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   var newTour = req.body;

//   if (!newTour || !newTour.name || !newTour.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err, //"Invalid dataset",
    });
  }
};

exports.createTour = async (req, res) => {
  console.log(req.body);

  // const newTour = new Tour();
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err, //"Invalid dataset",
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id); //  Tour.find({_id:req.params.id)

    res.status(200).json({
      status: "success",
      results: tour.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err, //"Invalid dataset",
    });
  }
};

exports.updateTour = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here...",
    },
  });
};

exports.deleteTour = async (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
