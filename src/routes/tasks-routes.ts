import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { TasksStatusController } from "@/controllers/tasks-status-controller";

const tasksRoutes = Router()
const tasksController = new TasksController()
const tasksStatusController = new TasksStatusController()

tasksRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
tasksRoutes.post("/", tasksController.create)
tasksRoutes.patch("/:id", tasksStatusController.update)
tasksRoutes.get("/", tasksController.index)

export { tasksRoutes }