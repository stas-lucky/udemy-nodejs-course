const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// ============================================================================
// Database connection
// ============================================================================
const DB = process.env.DATABASE_LOCAL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => console.log("Db connection is successful"));
//.catch((err) => console.error(err));
// ============================================================================

//console.log(app.get("env")); // From OS
//console.log(process.env); // From process

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

//TEST

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  // Every 24 hours recycles the app by sending SIGTERM
  // We need to react on and stop server gracefully

  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
