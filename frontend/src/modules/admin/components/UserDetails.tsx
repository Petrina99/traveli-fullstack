import { useEffect, useState } from "react"

import userService from "@/store/user-store/userService"
import { UserModel } from "@/models"

import style from '../styles/userDetails.module.css'

import { UserDetailsItem } from "."

export const UserDetails = () => {

    const [allUsers, setAllUsers] = useState<UserModel[]>([])
    const [admins, setAdmins] = useState<UserModel[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getAllUsers()
            setAllUsers(response)
        }

        fetchUsers()
    }, [allUsers])

    useEffect(() => {
        const findAdmins =  () => {
            const result = allUsers.filter((user) => (
                user.role === "ADMIN"
            ))

            setAdmins(result)
        }
        findAdmins()
    }, [allUsers])
    
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget

        const response = await userService.deleteUser(Number(value))

        window.alert(`Deleted user with id: ${response.id}, username: ${response.username}`)
    }

    return (
        <div className={style.layout}>
            <div className={style.userHeader}>
                <p>Number of users: {allUsers.length}</p>
                <p>Number of admins: {admins.length}</p>
            </div>
            {allUsers.map((user) => (
                <UserDetailsItem 
                    key={user.id}
                    data={user}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}