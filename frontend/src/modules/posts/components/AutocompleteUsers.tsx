import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import style from '../styles/header.module.css'

import userService from "@/store/user-store/userService"

import { UserModel } from "@/models"

export const AutocompleteUsers = () => {
    
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState("")
    const [allUsers, setAllUsers] = useState<UserModel[]>([])
    const [suggestions, setSuggestions] = useState<UserModel[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getAllUsers()

            setAllUsers(response)
        }

        fetchUsers()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setInputValue(value)

        if (allUsers) {
            const results:UserModel[] = allUsers.filter((user) => (
                user.username?.toLowerCase().startsWith(value.toLowerCase())
            ))

            if (value.length > 0) {
                if (results.length > 5) {
                    const slicedArray = results.slice(0, 5)
                    setSuggestions(slicedArray)
                } else {
                    setSuggestions(results)
                }
            } else {
                setSuggestions([])
            }
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const { value } = e.currentTarget.dataset
        
        if (value) {
            setInputValue(value)
        }

        setSuggestions([])
    }

    const handleButton = () => {

        const result = allUsers.find((user) => (
            user.username === inputValue
        ))
        
        if (result) {
            const id = result.id
            navigate(`/profile/${id}`)
        } else {
            navigate('/blog/error404/user')
        }
    }

    return (
        <>
            <div className={style.searchDiv}>
                <div className={style.inputDiv}>
                    <input 
                        type="text" 
                        name="user-search" 
                        id="user-search" 
                        placeholder='Search users' 
                        className={style.input}
                        autoFocus
                        autoComplete='off'
                        onChange={handleChange}
                        value={inputValue}
                    />
                    <button onClick={handleButton} className={style.inputButton}>
                        Find
                    </button>
                </div>
                {suggestions.length === 0 ? "" : (
                         <div id="users" className={style.suggestionDiv}>
                            <div className={style.suggestionItemDiv}>
                                {suggestions.map((x:UserModel) => (
                                    <p 
                                        key={x?.id} 
                                        className={style.suggestionItem}
                                        data-value={x.username}
                                        onClick={handleClick}
                                    >
                                        {x.username}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}
