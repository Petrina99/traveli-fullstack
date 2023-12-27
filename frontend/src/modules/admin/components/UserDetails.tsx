import { useEffect, useState } from "react"

import userService from "@/store/user-store/userService"
import { UserModel } from "@/models"

import style from '../styles/userDetails.module.css'

export const UserDetails = () => {

    const [allUsers, setAllUsers] = useState<UserModel[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getAllUsers()
            setAllUsers(response)
        }

        fetchUsers()
    }, [])

    return (
        <div className={style.layout}>
            gas
        </div>
    )
}