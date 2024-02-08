import ErrorhandlerClass from "../middleware/error.js";
import { Task } from "./../modal/task.js";
export const NewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });

    res.status(201).json({
      sucess: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetMyAllTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      successs: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorhandlerClass("Invalid Id", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      successs: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorhandlerClass("Task not found", 404));
    }
    await task.deleteOne();
    res.status(200).json({
      successs: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
