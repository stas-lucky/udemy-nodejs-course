const { promisify } = require("util");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60, // In seconds
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const coockieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000 // In miliseconds
    ),
    //secure: true,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded=proto"] === "https", // Heroku specific
  };

  res.cookie("jwt", token, coockieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Promisify jwt.verify
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      //console.log("ERROR", err);
      //console.log("DECODED", decoded);
      if (err) reject(err);
      resolve(decoded);
    });
  });

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  //console.log(url);

  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password"));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000), // In seconds
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Bearer {token}
  } else if (req.cookies.jwt) {
    // Try to get token from cookie
    token = req.cookies.jwt;
  }

  // 1. Check if token is there
  if (!token) return next(new AppError("Access forbidden", 401));

  // 2. Verify token
  // METHOD 1
  // const tokenPayload = await verifyToken(token);
  // console.log(tokenPayload);

  // METHOD 2
  const decodedTokenPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3. Check if user exists
  const currentUser = await User.findById(decodedTokenPayload.id);
  if (!currentUser)
    return next(new AppError("User is wrong, doesn't exist", 401));

  // 4. Check if user changed the password
  if (currentUser.changedPasswordAfter(decodedTokenPayload.iat)) {
    return next(new AppError("User recently changed password!", 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser; // PUG templates have access to response locals
  next();
});

// Only for rendered pagesm no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // Verify token
      const decodedTokenPayload = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3. Check if user exists
      const currentUser = await User.findById(decodedTokenPayload.id);
      if (!currentUser) return next();

      // 4. Check if user changed the password
      if (currentUser.changedPasswordAfter(decodedTokenPayload.iat)) {
        return next();
      }

      // There is logged in user
      res.locals.user = currentUser; // PUG templates have access to response locals
      return next();
    } catch {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user);
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  // 2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send email to user

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetUrl).sendResetPassword();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error happened dusring email send", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Email was sent",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
  });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Incorrect current password", 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});
