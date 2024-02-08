import { User } from "../modal/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorhandlerClass from "../middleware/error.js";

export const GetMyDetails = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorhandlerClass("Invalid email and password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorhandlerClass("Invalid email and password", 400));
    }
    sendCookie(user, res, `Welcome ${user.name} brother `, 200);
  } catch (error) {
    next(error);
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return next(
        new ErrorhandlerClass(
          "User already available check use another email id",
          400
        )
      );
    }

    const hassedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hassedPassword });

    sendCookie(user, res, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:
        process.env.NODE_ENV === "development" ? "lax" : "none", // Set sameSite attribute to "None"
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
