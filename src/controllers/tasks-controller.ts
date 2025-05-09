import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TasksController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(3),
      description: z.string().trim(),
      priority: z.enum(['low', 'medium', 'high']),
      assigned_to: z.string().uuid(),
      team_id: z.string().uuid()
    })

    const { title, description, priority, assigned_to, team_id } = bodySchema.parse(req.body)

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        assignedTo: assigned_to,
        teamId: team_id
      }
    })

    return res.json(task)
  }

  async index(req: Request, res: Response) {
    const tasks = await prisma.task.findMany()

    return res.json(tasks)
  }

  async showTeamTasks(req: Request, res: Response) {
    const paramsSchema = z.object({
      team_id: z.string().uuid()
    })

    const { team_id } = paramsSchema.parse(req.params)

    const userId = req.user?.id

    const isMember = await prisma.teamMember.findFirst({
      where: {
        userId,
        teamId: team_id
      }
    })

    if (!isMember) {
      throw new AppError("You can only view tasks of your team")
    }

    const tasks = await prisma.task.findMany({
      where: {
        teamId: team_id
      }
    })

    return res.json(tasks)
  }
}

export { TasksController }