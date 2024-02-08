import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  console.log(process.env.NODE_ENV_VARIABLE);
  console.log(process.env.NODE_ENV_VARIABLE === "Development");
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:
        process.env.NODE_ENV === "Development" ? "lax" : "none", // Set sameSite attribute to "None"
      secure: process.env.NODE_ENV === "Development" ? false : true, // Ensure secure flag is set since sameSite is "None"
    })
    .json({
      success: true,
      message,
    });
};
