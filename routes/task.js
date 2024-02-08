import express from "express";
import {
  DeleteTask,
  GetMyAllTask,
  NewTask,
  UpdateTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, NewTask);
router.get("/my", isAuthenticated, GetMyAllTask);
router.route("/:id").put(isAuthenticated,UpdateTask).delete(isAuthenticated,DeleteTask);

export default router;
