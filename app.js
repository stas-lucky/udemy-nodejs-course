const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

process.on("uncaughtException", (err) => {
  console.log("Encaught Exception:", err);
  process.exit(1);
});

const app = express();

// Middlewares

if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Controllers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Error handling
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

/**
 * Middleware for logging requests and responses to console.log()
 */
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] Request:  ${req.url}`);
//   next();
//   console.log(
//     `[${new Date().toISOString()}] Response: ${req.url} ${res.statusCode}`
//   );
// });
