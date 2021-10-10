const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

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
