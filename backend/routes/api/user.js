const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const AppError = require('../../Utils/appError')
// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Keys
const keys = require("../../config/keys");
// Load User Model
const User = require("../../models/User");
// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Test User");
});
// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // check Validation
  if (!isValid) {
    return res.status(400).json({
      status: "fail",
      errors,
    });
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json({
        status: "fail",
        errors,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role:req.body.role
      });

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.passwordConfirm = hash;
          newUser
            .save()
            .then((user) => {
              res.status(201).json({
                status: "success",
                data: {
                  user,
                },
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/user/Login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res , next) => {
 try{
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({
      status: "fail",
      errors,
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
  .then((user) => {
    // check for user
    if (!user) {
      return  res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched
        // create jwt Payload
        const payload = {
          id: user._id,
          name: user.name,
        };
        // sign token

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              status: "success",
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(401).json({
          status: 'fail',
          message: 'username or password incorrect'
        })
        // next(new AppError('username or password incorrect' , '401'))
      }
    });
  });
 }catch(err){
   next(new AppError('username or password incorrect'))
 }
});

// @route   GET api/user/current
// @desc    Return current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  }
);
module.exports = router;
