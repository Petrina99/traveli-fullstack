import { Header, Post, Footer } from "@/modules"

import style from '../styles/blogHome.module.css'

import { useBoundStore } from "@/store"

// probni podatci prije izrade backenda

import data from '@/const/posts'

export const BlogHome = () => {

    const posts = useBoundStore((state) => state.posts)
    const addPosts = useBoundStore((state) => state.addPost)

    for (let i = 0; i < data.length; i++) {
        addPosts(data[i])
    }
    
    return (
        <div className={style.layout}>
            <Header />
            {posts.map((x) => (
                <Post data={x} key={x.id} />
            ))}
            <Footer />
        </div>
    )
}
