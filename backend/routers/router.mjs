import express from "express";
import controller from "../controllers/controller.mjs";

const router = express.Router();

router.route("/create").post(controller.CreateTodo);
router.route("/get").get(controller.GetTodo);
router.route("/update/:name").patch(controller.UpdateTodo);
router.route("/delete/:name").delete(controller.DeleteTodo);
router.route("/deleteAll").delete(controller.DeleteAllTodo);

export default router;
