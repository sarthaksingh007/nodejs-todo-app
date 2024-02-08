import { User } from "../modal/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Logged in first",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    next(error);
  }
};
