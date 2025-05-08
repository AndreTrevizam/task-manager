import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TeamMembersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      team_id: z.string().uuid()
    })

    const { user_id, team_id } = bodySchema.parse(req.body)

    await prisma.teamMember.create({
      data: {
        userId: user_id,
        teamId: team_id
      }
    })

    return res.json()
  }

  async remove(req: Request, res: Response) {
    const paramsSchema = z.object({
      user_id: z.string().uuid(),
      team_id: z.string().uuid()
    })

    const { user_id, team_id } = paramsSchema.parse(req.params)

    const teamMember1 = await prisma.teamMember.findFirst({
      where: {
        userId: user_id,
        teamId: team_id
      }
    })

    if (!teamMember1) {
      throw new AppError("Team member doens't exist!")
    }

    await prisma.teamMember.delete({
      where: {
        id: teamMember1.id
      }
    })

    return res.json()
  }

  async index(req: Request, res: Response) {
    const teamMembers = await prisma.teamMember.findMany()

    return res.json(teamMembers)
  }
}

export { TeamMembersController }