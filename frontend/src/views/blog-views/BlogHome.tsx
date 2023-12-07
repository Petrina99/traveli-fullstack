import { Header, Post, Footer } from "@/modules"

import style from '../styles/blogHome.module.css'

import { useBoundStore } from "@/store"
import { useEffect } from "react"

import { Link } from 'react-router-dom'

export const BlogHome = () => {

    const posts = useBoundStore((state) => state.posts)
    const getPosts = useBoundStore((state) => state.getPosts)

    useEffect(() => { 
        const fetchPosts = async () => {
            await getPosts()
        }

        fetchPosts()
    })

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.addNewPost}>
                <Link to='/blog/create'>
                    Create a new post
                </Link>
            </div>
            {posts.map((x) => (
                <Post data={x} key={x.id}/>
            ))}
            <Footer />
        </div>
    )
}
