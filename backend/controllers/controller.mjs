import TodoModel from "../models/TodoModel.mjs";

const CreateTodo = async (req, res) => {
  await TodoModel.create(req.body);
  res.status(200).json({ msg: "Task Added" });
};

const GetTodo = async (req, res) => {
  const allTodo = await TodoModel.find({});
  const todoarray = [];

  allTodo.forEach((todo) => {
    todoarray.push(todo.name);
  });
  res.json(todoarray);
};

const UpdateTodo = async (req, res) => {
  const name = req.params.name;
  const updatedName = req.body;
  const filter = { name: name };

  await TodoModel.findOneAndUpdate(filter, updatedName);
  res.status(200).json({ msg: "Task Updated" });
};

const DeleteTodo = async (req, res) => {
  const name = req.params.name;
  await TodoModel.deleteOne({ name: name });
  res.status(200).json({ msg: "Task Deleted" });
};

const DeleteAllTodo = async (req, res) => {
  await TodoModel.deleteMany({});
  res.status(200).json({ msg: "All Tasks Deleted" });
};

export default { CreateTodo, DeleteTodo, DeleteAllTodo, GetTodo, UpdateTodo };
