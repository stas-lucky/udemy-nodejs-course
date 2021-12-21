const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("../../models/tourModel");
const User = require("../../models/userModel");
const Review = require("../../models/reviewModel");

dotenv.config({ path: "./../../config.env" });

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

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Data imported succesfully");
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data deleted succesfully");
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  console.log(process.argv);
  if (process.argv[2] === "--import") {
    console.log("Importing data");
    await importData();
  } else if (process.argv[2] === "--delete") {
    console.log("Deleting data");
    await deleteData();
  }
  process.exit();
};

main();
