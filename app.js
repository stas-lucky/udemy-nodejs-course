const path = require("path");
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

process.on("uncaughtException", (err) => {
  console.log("Encaught Exception:", err);
  process.exit(1);
});

const app = express();
app.enable("trust proxy");

// pug set up
app.set("view engine", "pug"); // sets pug as render engine
app.set("views", path.join(__dirname, "views")); // sets folder with pug views

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

//app.use(helmet()); // Sets security HTTP headers
// Middlewares
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter); // Set limit requests

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parse
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(express.urlencoded());
app.use(cookieParser({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent params pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "price",
    ],
  })
);

// Controllers
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  //console.log(req.cookies);
  next();
});

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
