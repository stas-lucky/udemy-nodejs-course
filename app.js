const exp = require("constants");
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

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

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
