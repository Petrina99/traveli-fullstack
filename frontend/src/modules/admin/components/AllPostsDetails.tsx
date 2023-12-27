import { usePostStore } from "@/store"
import { OnePostDetails } from "."

import postService from "@/store/post-store/postService"

import style from '../styles/postDetails.module.css'
import { useEffect } from "react"

export const AllPostsDetails = () => {

    const posts = usePostStore((state) => state.posts)
    const deletePost = usePostStore((state) => state.deletePost)
    const addPosts = usePostStore((state) => state.addPosts)
    
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget
        
        const response = await postService.deletePost(Number(value))
        deletePost(response)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts()
            addPosts(fetchedPosts)
        }

        fetchPosts()
    }, [posts])

    return (
        <div className={style.layout}>
            <div className={style.postInfo}>
                Number of posts: {posts.length}
            </div>
            {posts.reverse().map((post) => (
                <OnePostDetails 
                    data={post} 
                    key={post.id}
                    handleDelete={handleDelete} 
                />
            ))}
        </div>
    )
}