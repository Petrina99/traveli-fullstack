import { Header, Post, Footer } from "@/modules"

import { useEffect } from "react"

import style from '../styles/blogHome.module.css'

import { useBoundStore } from "@/store"

// probni podatci prije izrade backenda

import data from '@/const/posts'

export const BlogHome = () => {

    const posts = useBoundStore((state) => state.posts)
    const addPosts = useBoundStore((state) => state.addPost)
    const resetPosts = useBoundStore((state) => state.reset)

    useEffect(() => {
        resetPosts()
        data.forEach((d) => addPosts(d))
    }, [])
    
    return (
        <div className={style.layout}>
            <Header />
            {posts.map((x) => (
                <Post data={x} key={x.id}/>
            ))}
            <Footer />
        </div>
    )
}
