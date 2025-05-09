import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { TasksStatusController } from "@/controllers/tasks-status-controller";

const tasksRoutes = Router()
const tasksController = new TasksController()
const tasksStatusController = new TasksStatusController()

tasksRoutes.post("/",
  ensureAuthenticated,
  verifyUserAuthorization(['admin']),
  tasksController.create
)

tasksRoutes.patch("/:id/status", 
  ensureAuthenticated,
  verifyUserAuthorization(['member', 'admin']),
  tasksStatusController.update
)

tasksRoutes.get("/", 
  ensureAuthenticated,
  verifyUserAuthorization(['admin']),
  tasksController.index
)

tasksRoutes.get("/:team_id/tasks",
  ensureAuthenticated,
  verifyUserAuthorization(['member', 'admin']),
  tasksController.showTeamTasks
)

export { tasksRoutes }