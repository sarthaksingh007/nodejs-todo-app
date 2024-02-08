import express from "express";
import {
  Register,
  Login,
  GetMyDetails,
  logout,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, GetMyDetails);

router.post("/new", Register);
router.post("/login", Login);
router.get("/logout", logout);

// router.get("/userid/special", SpecialRoute);

//dynamic routing take always in the end .

// router.get("/userid/:id", FindUser);
// router.get("/userid/:id", UpdateUser);
// router.get("/userid/:id", DeleteUser);

export default router;
