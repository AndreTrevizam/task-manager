import { Router } from "express";
import { TeamMembersController } from "@/controllers/team-members-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const teamMembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMembersRoutes.use(ensureAuthenticated, verifyUserAuthorization(['admin']))
teamMembersRoutes.post("/", teamMembersController.create)
teamMembersRoutes.delete("/:user_id/:team_id", teamMembersController.remove)
teamMembersRoutes.get("/", teamMembersController.index)

export { teamMembersRoutes }
