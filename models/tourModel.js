const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour must have a name"],
      unique: true,
      trim: true,
      maxLength: [40, "A tour name must have less or equal then 40 character"],
      minLength: [10, "A tour name must have more or equal then 10 character"],
      // validate: {
      //   validator: validator.isAlpha,
      //   message: "Tour name must contain only characters",
      // },
    },
    duration: {
      type: Number,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have group size"],
    },
    difficulty: {
      type: String,
      require: [true, "A tour should have difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //console.log("VALIDATION: ", this, val);
          return val < this.price;
        },
        message: "Price discount ({VALUE}) higher than price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Price is summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour should have image cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: String,
    secret: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Options part
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// ===============================================================
// Document middleware

// Only on .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});
// ===============================================================

// ===============================================================
// Query middleware

tourSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ secret: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took: ${Date.now() - this.start}`);
  // console.log(docs);
  next();
});

// ===============================================================

// ===============================================================
// Aggregation middleware

tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { secret: { $ne: true } },
  });
  console.log(this.pipeline());
  next();
});

// ===============================================================

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
