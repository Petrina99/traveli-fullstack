import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getComments = async (req: Request, res: Response) => {
    const { id } = req.params
  
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(id)
      }
    })
  
    res.json(comments)
}

export const createComment = async (req: Request, res: Response) => {
    const { id, userid } = req.params 
  
    const { text } = req.body
    const newComment = await prisma.comment.create({
      data: {
        text: text,
        author: { connect: {id: Number(userid)}},
        post: { connect: {id: Number(id)}}
      }
    })
  
    res.json(newComment)
}

export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleteComment = await prisma.comment.delete({
        where: {
            id: Number(id)
        }
    })

    res.json(deleteComment)
}
