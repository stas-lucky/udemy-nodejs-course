const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      messgae: "Something went really wrong!!!",
    });
  }
};

// Error middleware should have four arguments. "err" is the first
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    sendErrorDev(error, res);
  } else {
    // Non dev environments
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    sendErrorProd(error, res);
  }
};
