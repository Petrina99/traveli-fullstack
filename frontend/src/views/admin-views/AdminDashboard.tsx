import { useUserStore } from "@/store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import style from '../styles/adminDashboard.module.css'

import { Header, CreatePost, AllPostsDetails, UserDetails } from "@/modules"
import { useEffect } from "react"

const choices = [{
    name: "Create new post",
    id: 0,
}, {
    name: "Posts info",
    id: 1,
}, {
    name: "Users info",
    id: 2
}]

import { ChoiceButton } from "@/modules"

export const AdminDashboard = () => {

    const navigate = useNavigate()

    const [currentChoice, setCurrentChoice] = useState(2)

    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (user?.role !== "ADMIN") {
            navigate('/blog')
        }
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget;

        console.log(value)
        setCurrentChoice(Number(value))
    }

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.heading}>
                <h1>ADMIN DASHBOARD</h1>
            </div>
            <div className={style.buttonDiv}>
                <div className={style.buttonLayout}>
                    {choices.map((choice) => (
                        <ChoiceButton 
                            choice={choice} 
                            key={choice.id} 
                            handleClick={handleClick}
                        />
                    ))}
                </div>
            </div>
            {currentChoice === 0 ? <CreatePost /> : ""}
            {currentChoice === 1 ? <AllPostsDetails /> : ""}
            {currentChoice === 2 ? <UserDetails /> : ""}
        </div>
    )
}