import { Header, Post } from "@/modules"

import style from '../styles/blogHome.module.css'

import { useLikeStore, usePostStore } from "@/store"
import { useEffect } from "react"

import { Link } from 'react-router-dom'

import postService from "@/store/post-store/postService"
import likeService from "@/store/like-store/likeService"

export const BlogHome = () => {

    const posts = usePostStore((state) => state.posts)
    const addPosts = usePostStore((state) => state.addPosts)

    const getLikes = useLikeStore((state) => state.getLikes)

    useEffect(() => {  
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts()
            addPosts(fetchedPosts)
            
            const fetchedLikes = await likeService.getAllLikes()
            getLikes(fetchedLikes)
        }
        fetchPosts()
    }, [])

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.addNewPost}>
                <Link to='/blog/create'>
                    Create a new post
                </Link>
            </div>
            {posts.reverse().map((x) => (
                <Post data={x} key={x.id}/>
            ))}
        </div>
    )
}
