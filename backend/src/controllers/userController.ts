import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabase } from "../server"

import randomstring from 'randomstring'

export const generateJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
        algorithm: 'HS256'
    })
}

const prisma = new PrismaClient()

export const getUser = async (req: Request, res: Response) => {
    
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.json(user)
}

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()

    res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
    
    const { email, username, password, role } = req.body

    const emailExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    const usernameExists = await prisma.user.findUnique({
        where: {
            username
        }
    })
  
    if (emailExists) {
        return res.json("error email")
    }

    if (usernameExists) {
        return res.json("error username")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: role === "ADMIN" ? "ADMIN" : "USER"
        }
    })

    if (createdUser) {
        res.json(createdUser)
    } else {
        res.json("error create")
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const loggedUser = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    
    if (loggedUser && (await bcrypt.compare(password, loggedUser.password))) {
        res.json(loggedUser)
    } else {
        res.json("error")
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const findUser = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })    

    if (findUser) {
        if (findUser?.imageUrl !== "") {
            const { data } = await supabase
                .storage
                .from('images')
                .remove([`${findUser?.imageUrl?.slice(-21)}`])
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.json(deletedUser)
    }
}

export const addUserImage = async (req: Request, res: Response) => {
    try {
        if (!req.file?.buffer) {
            return res.json({ error: "No file uploaded"})
        }

        const { id } = req.params

        const randomString = randomstring.generate(10)

        const currentUser = await prisma.user.findFirst({
            where: {
                id: Number(id),
            }
        })

        if (currentUser?.imageUrl !== "") {
            const { data } = await supabase
                .storage
                .from('images')
                .remove([`${currentUser?.imageUrl?.slice(-21)}`])
        }

        const { data, error } = await supabase
            .storage
            .from('images')
            .upload('user-image-' + randomString, req.file.buffer, {
                upsert: true
            })
        
        if (error) {
            return res.json({ error: error })
        }

        if (data) {
            const { data } = supabase
                .storage
                .from('images')
                .getPublicUrl('user-image-' + randomString);

            const user = await prisma.user.update({
                where: {
                    id: Number(id)
                }, 
                data : {
                    imageUrl: data.publicUrl
                }
            })

            res.json(user)
        }
    } catch (error) {
        console.error(error)
        res.json({ error: "Server error"})
    }
}