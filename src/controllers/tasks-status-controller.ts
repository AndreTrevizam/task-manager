import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TasksStatusController {
  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      status: z.enum(['pending', 'in_progress', 'completed'])
    })

    const { id } = paramsSchema.parse(req.params)
    const { status } = bodySchema.parse(req.body)

    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      throw new AppError("Task not found", 404)
    }

    const userId = req.user?.id

    if (task?.assignedTo !== userId) {
      throw new AppError("You can only modify your own task")
    }

    await prisma.task.update({
      data: {
        status: status
      },
      where: {
        id
      }
    })

    return res.json()
  }
}

export { TasksStatusController }