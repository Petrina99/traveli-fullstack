import { Header, Post } from "@/modules"
import { usePostStore } from "@/store"

import { Link, useParams } from "react-router-dom"

import { useEffect, useState } from "react"

import style from '../styles/blogHome.module.css'
import { PostModel } from "@/models"

export const BlogLocations = () => {

    const { loc } = useParams()

    const posts = usePostStore((state) => state.posts)
    const [filteredPosts, setFilteredPosts] = useState<PostModel[]>([])

    useEffect(() => {
        const filterPosts = () => {
            let filter: PostModel[] = posts.filter((post: PostModel) => (
                post.location === loc
            ))

            setFilteredPosts(filter)
        }

        filterPosts()
    }, [])

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.addNewPost}>
                <Link to='/blog/create'>
                    Create a new post
                </Link>
            </div>
            {filteredPosts.reverse().map((x) => (
                <Post data={x} key={x.id}/>
            ))}
        </div>
    )
}