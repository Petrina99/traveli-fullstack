import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express'

const prisma = new PrismaClient()


export const getPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany()
    
    res.status(200).json(posts)
}

export const getPost = async(req: Request, res: Response) => {
    const { id } = req.params
    
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.json(post)
}

export const getUserPosts = async (req: Request, res: Response) => {
    const { id } = req.params

    const userPost = await prisma.post.findMany({
        where: {
            authorId: Number(id)
        }
    })

    res.json(userPost)
}

export const createPost = async (req: Request, res: Response) => {
    const { title, location, content, authorId } = req.body

    const createdPost = await prisma.post.create({
        data: {
          title,
          location,
          content,
          author: { connect: { id: Number(authorId) } },
        }
      })
    
      res.json(createdPost)
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedPost = await prisma.post.delete({
          where: {
            id: Number(id)
          }
        })
      
        res.json(deletedPost)
      } catch (error) {
        res.json({ error: "Post with that id does not exist" })
      }
}

export const likePost = async (req: Request, res: Response) => {
    const { id } = req.params

    const updatedPost = await prisma.post.update({
        where: {id: Number(id)},
        data: {
            likes: {
              increment: 1
            }
          }
        })
      
    res.json(updatedPost)
 
}

export const dislikePost = async (req: Request, res: Response) => {
    const { id } = req.params

    const updatedPost = await prisma.post.update({
        where: {id: Number(id)},
        data: {
            likes: {
              decrement: 1
            }
          }
        })
      
    res.json(updatedPost)
}