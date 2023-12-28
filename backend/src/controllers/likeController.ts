import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const toggleLike = async (req: Request, res: Response) => {
    const { id, userid } = req.params 

    const newLike = await prisma.like.findFirst({
        where: {
            userId: Number(userid),
            postId: Number(id)
        }
    })

    if (newLike) {
        const like = await prisma.like.delete({
            where: {
                id: newLike.id
            }
        })

        res.json({
            like: like,
            message: "deleted"
        })
    } else {
        const like = await prisma.like.create({
            data: {
              user: { connect: { id: Number(userid)} },  
              post: { connect: { id: Number(id)} }
            },
        })
        
        res.json({
            like: like,
            message: "created"
        })
    }
}

export const getLikes = async (req: Request, res: Response) => {
    const { id } = req.params

    const likeCount = await prisma.like.findMany({
        where: {
            postId: Number(id)
        }
    })

    res.json(likeCount)
}

export const getAllLikes = async (req: Request, res: Response) => {

    const allLikes = await prisma.like.findMany()

    res.json(allLikes)
}