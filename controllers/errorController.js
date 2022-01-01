const AppError = require("../utils/appError");

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // API
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err: err,
    });
  }
  // Rendered website
  //console.error("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const keys = Object.keys(err.keyValue); // Structure: ... keyValue: { name: 'TesttourNEW2' } ...
  const fields = keys.map((key) => `${key}: ${err.keyValue[key]}`).join(",");
  const message = `Duplicate field value: ${fields}. Try another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Input data is invalid: ${errors.join("; ")}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => new AppError("Invalid token", 401);
const handleTokenExpiredError = () => new AppError("Token expired", 401);

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // API
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //console.error("ERROR", err);
    return res.status(500).json({
      status: "error",
      message: "Something went really wrong!!!",
    });
  } else {
    // Rendered website
    //console.error("ERROR", err);
    if (err.isOperational) {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong!!!!!",
        msg: err.message,
      });
    }

    return res.status(err.statusCode).render("error", {
      title: "Oh. Something went wrong!",
      msg: "Please try again later",
    });
  }
};

// Error middleware should have four arguments. "err" is the first
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("ERROR:", err);
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    // Non dev environments
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

    sendErrorProd(err, req, res);
  }
};
