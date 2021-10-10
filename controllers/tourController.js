const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTourByIdParam = (req) => {
  const id = req.params.id * 1; // Use "* 1" to convert to number
  return tours.find((t) => t.id === id);
};

exports.checkId = (req, res, next, val) => {
  const tour = getTourByIdParam(req);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  var newTour = req.body;

  if (!newTour || !newTour.name || !newTour.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  const tour = getTourByIdParam(req);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const tour = getTourByIdParam(req);

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here...",
    },
  });
};

exports.deleteTour = (req, res) => {
  const tour = getTourByIdParam(req);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
