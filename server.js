const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// ============================================================================
// Database connection
// ============================================================================
const DB = process.env.DATABASE_LOCAL.replace(
  "<PASSWORD>",
  process.env.PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => console.log("Db connection is succesfull"))
  .catch((err) => console.error(err));
// ============================================================================

//console.log(app.get("env")); // From OS
//console.log(process.env); // From process

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

//TEST