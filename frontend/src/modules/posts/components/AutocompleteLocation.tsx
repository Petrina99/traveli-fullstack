import { PostModel } from "@/models"
import { usePostStore } from "@/store"

import { useEffect, useState } from "react"

import style from '../styles/header.module.css'

import { useNavigate } from "react-router-dom"

export const AutocompleteLocation = () => {

    const navigate = useNavigate()

    const posts = usePostStore((state) => state.posts)

    const [inputValue, setInputValue] = useState("")
    const [allLocations, setAllLocation] = useState<string[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])

    useEffect(() => {
        const getLocations = () => {
            let locations: string[] = [];

            posts.map((post: PostModel) => {
                locations.push(post.location)
            })

            setAllLocation(locations)
        }

        getLocations()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setInputValue(value)

        if (allLocations) {
            const results: string[] = allLocations.filter((location) => (
                location.toLowerCase().startsWith(value.toLowerCase())
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

    const findLocation = () => {
        const result = allLocations.find(
            (location) => {
                if (inputValue.toLowerCase() === location.split(",")[0].toLowerCase()) {
                    return location
                }

                if (inputValue.toLowerCase() === location.toLowerCase()) {
                    return location
                }
            }
        )

        return result
    }

    const handleButton = () => {

        const result = findLocation()
        
        if (result) {
            navigate(`/blog/location/${result}`)
        } else {
            navigate('/blog/error404/location')
        }
    }
    return (
        <>
            <div className={style.searchDiv}>
                <div className={style.inputDiv}>
                    <input 
                        type="text" 
                        name="loc-search" 
                        id="loc-search" 
                        placeholder='Search locations' 
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
                                {suggestions.map((sugg: string) => (
                                    <p 
                                        key={sugg} 
                                        className={style.suggestionItem}
                                        data-value={sugg}
                                        onClick={handleClick}
                                    >
                                        {sugg}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}