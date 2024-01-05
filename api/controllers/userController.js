import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmail } from "./emailController.js";
import crypto from "crypto";

export const test = async (req, res) => {
  res.json("hello world");
};

export const createUser = async (req, res, next) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    });
    try {
      await newUser.save();
      res.status(201).json("User created successfully..");
    } catch (error) {
      res.status(500).json(error.message);
      next(error);
    }
  } else {
    return next(errorHandler(422, "User already exits!"));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) return next(errorHandler(404, "User not found!"));

    if (findUser.role == "user") {
      const validPassword = bcryptjs.compareSync(password, findUser.password);
      if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = findUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      return next(errorHandler(400, "Proceed to Admin login."));
    }
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findAdmin = await User.findOne({ email });
    if (!findAdmin) return next(errorHandler(404, "User not found!"));

    if (findAdmin.role == "admin") {
      const validPassword = bcryptjs.compareSync(password, findAdmin.password);
      if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

      const token = jwt.sign({ id: findAdmin._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = findAdmin._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      return next(errorHandler(401, "Unauthorized!"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const saveAddress = async (req, res, next) => {
  const { id } = req.user;
  const findUser = await User.findById(id);
  if (!findUser) return next(errorHandler(404, "User not found!"));
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        address: req.body.address,
      },
    },
    { new: true }
  );
  res.json(updateUser);
};

export const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await User.find();
    res.json(getAllUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return next(errorHandler(404, "Id is not exits or valid."));
  } else {
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      next(error);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return next(errorHandler(404, "Id is not exits or valid."));
  } else {
    try {
      const data = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          isBlocked: true,
        },
      });
      res.json({
        message: "user blocked.",
      });
    } catch (error) {
      next(error);
    }
  }
};

export const unblockUser = async (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return next(errorHandler(404, "Id is not exits or valid."));
  } else {
    try {
      const data = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          isBlocked: false,
        },
      });
      res.json({
        message: "user unblocked.",
      });
    } catch (error) {
      next(error);
    }
  }
};

export const logOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(201).json("User logged out!");
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(errorHandler(404, "User not found!"));

  try {
    const token = await user.generatePasswordResetToken();
    await user.save();

    const resetURL = `Hi, Please follow this link to reset your password. This link is valid only for 10 minutes. <a href="http://localhost:5000/api/user/reset-password/${token}">Click here</a>`;

    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };

    await sendEmail(data);

    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(errorHandler(401, "Token expired, Please try again later!"));
    }

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  const { id } = req.user;
  try {
    const findUser = await User.findById(id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    next(error);
  }
};
