import { useState, useEffect } from "react"

import style from '../styles/header.module.css'

import searchIcon from "@/assets/icon _search engine_.svg"

import userService from "@/store/user-store/userService"

import { UserModel } from "@/models"

export const Autocomplete = () => {
    const [allUsers, setAllUsers] = useState([])
    const [suggestions, setSuggestions] = useState([])
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getAllUsers()

            setAllUsers(response)
        }

        fetchUsers()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value)

        if (allUsers) {
            const results = allUsers.filter((user:UserModel) => (
                user.username?.toLowerCase().startsWith(value.toLowerCase())
            ))

            if (value.length > 0) {
                setSuggestions(results)
            } else {
                setSuggestions([])
            }
        }
    }

    return (
        <>
            <div className={style.searchDiv}>
                <div className={style.inputDiv}>
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder='Search users' 
                        className={style.input}
                        autoFocus
                        autoComplete='off'
                        onChange={handleChange}
                        list="users"
                    />
                    <button>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                    <datalist id="users" className={style.suggestionDiv}>
                        {suggestions.map((x:UserModel) => (
                            <option key={x?.id} value={x.username} className={style.suggestionItem} />
                        ))}
                    </datalist>
                </div>
            </div>
        </>
    )
}
