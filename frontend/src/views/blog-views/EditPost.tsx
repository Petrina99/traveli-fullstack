import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usePostStore, useUserStore } from "@/store"

import { PostModel } from "@/models"

import postService from "@/store/post-store/postService"

import style from '../styles/editPost.module.css'
import { Header } from "@/modules"

export const EditPost = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const user = useUserStore((state) => state.user)
    const posts = usePostStore((state) => state.posts)
    const editPost = usePostStore((state) => state.editPost)

    const [post, setPost] = useState<PostModel>()
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {

        const getPost = async () => {

            const currentPost = posts.find((p:PostModel) => p.id === Number(id))

            if (currentPost) {
                setPost(currentPost)
                setTitle(currentPost.title)
                setLocation(currentPost.location)
                setContent(currentPost.content)
            }

            console.log(user?.id, post?.authorId)
            if (user?.role !== "ADMIN") {
                if (user?.id !== currentPost?.authorId) {
                    navigate('/blog')
                }
            }
        }


        getPost()
    }, [])

    const handleSubmit = async () => {

        if (title && location && content && post) {
            if (post.id) {
                const newPost = await postService.editPost(post.id, { title, location, content })
                editPost(newPost)
                navigate('/blog')
            }
        }
    }

    return (
        <div className={style.editLayout}>
            <Header />
            <div className={style.layout}>
                <form className={style.form}>
                    <h1 className={style.formHeading}>Edit a post</h1>
                    <div className={style.inputDiv}>
                        <input 
                            type="text"
                            placeholder='Title'
                            id='title-create'
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <input 
                            type="text"
                            placeholder='Location'
                            id='location-create'
                            value={location}
                            onChange={(e) => setLocation(e.currentTarget.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <textarea 
                            id="content-create"
                            placeholder='Your story here'
                            cols={30} 
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.currentTarget.value)}
                        ></textarea>
                    </div>
                    <div className={style.buttonDiv}>
                        <button 
                            type='button'
                            onClick={handleSubmit}
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}