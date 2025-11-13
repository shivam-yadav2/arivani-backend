import Task from "../model/task.model.js";

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const taskExist = await Task.findOne({ title });
  if (taskExist) {
    return res.status(400).json({ message: "Task already exists" });
  }

  const user = req.user;
  console.log("User from token:", user);
  const data = {
    title,
    description,
    status: status ? status : "pending",
    userId: user.id,
  };
  const task = await Task.create(data);
  console.log(task);
  res.status(200).json({ task });
};

const getAllTasks = async (req, res) => {
  const { id } = req.user;
  const tasks = await Task.find({
    userId: id,
  });
  res.status(200).json({ tasks });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  console.log(task);

  if (!task) {
    return res.status(400).json({ message: "task Not found" });
  }

  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  // console.log(task)

  if (!task) {
    return res.status(400).json({ message: "task Not found" });
  }

  res.status(200).json({ message: "Task Deleted Successfully" });
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
    }, { new: true });
  
    if (!task) {
      return res.status(400).json({ message: "task Not found" });
    }
  
    res.status(200).json({ task });
  };


export { createTask, getAllTasks, getById, deleteTask, editTask };