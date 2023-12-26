import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
        res.status(400)
        throw new Error('User with that email already exists')
    }

    if (usernameExists) {
        res.status(400)
        throw new Error('User with that username already exists')
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
        res.json({
            user: createdUser,
            id: createdUser.id,
            token: generateJWT(createdUser.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
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