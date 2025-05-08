import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"

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