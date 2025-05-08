import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { describe } from "node:test";

class TeamsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      description: z.string().trim()
    })

    const { name, description } = bodySchema.parse(req.body)

    await prisma.team.create({
      data: {
        name,
        description
      }
    })

    return res.status(201).json()
  }

  async index(req: Request, res: Response) {
    const teams = await prisma.team.findMany({
      include: {
        teamMembers: {
          select: { id: true }
        }
      }
    })

    return res.status(200).json(teams)
  }

  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string().trim(),
      description: z.string().trim()
    })

    const { id } = paramsSchema.parse(req.params)
    const { name, description } = bodySchema.parse(req.body)

    await prisma.team.update({
      data: {
        name,
        description
      },
      where: {
        id
      }
    })

    return res.json()
  }

  async remove(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.team.delete({
      where: {
        id
      }
    })

    return res.json()
  }
}

export { TeamsController }