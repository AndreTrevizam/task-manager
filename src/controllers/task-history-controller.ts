import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod"

class TaskHistoryController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      task_id: z.string().uuid(),
      changed_by: z.string().uuid(),
      new_status: z.enum(['pending', 'in_progress', 'completed'])
    })

    const { task_id, changed_by, new_status } = bodySchema.parse(req.body)

    const task = await prisma.task.findUnique({
      where: { id: task_id }
    })

    if (!task) {
      throw new AppError("Task not found!", 404)
    }

    if (task.status === "completed") {
      throw new AppError("Task is already completed", 400)
    }

    await prisma.taskHistory.create({
      data: {
        taskId: task_id,
        newStatus: new_status,
        oldStatus: task.status,
        changedBy: changed_by
      }
    })

    return res.status(201).json()
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      task_id: z.string().uuid()
    })

    const { task_id } = paramsSchema.parse(req.params)

    const log = await prisma.task.findUnique({
      where: { id: task_id},
      include: {
        history: true
      }
    })

    if (!log) {
      throw new AppError("Task not found!", 404)
    }

    return res.json(log)
  }
}

export { TaskHistoryController }