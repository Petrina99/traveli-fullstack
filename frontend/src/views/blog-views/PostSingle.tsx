import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { Header, Comment, AddComment } from "@/modules"

import style from '../styles/postSingle.module.css'

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'
import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'
import commIcon from '@/assets/comment-5-svgrepo-com.svg'
import activeCommIcon from '@/assets/comment-yellow.svg'

import { useCommentStore, usePostStore, useUserStore } from "@/store"
import { PostModel, UserModel } from "@/models"

import userService from "@/store/user-store/userService"
import postService from "@/store/post-store/postService"

import { useLike } from "@/modules"
import commentService from "@/store/comment-store/commentService"

export const PostSingle = () => {

    const { id } = useParams()

    let loc = useLocation()
    const navigate = useNavigate()
    
    const { likes, getLikes, isLiked, checkLiked, toggleLike } = useLike()

    const posts = usePostStore((state) => state.posts)

    const user = useUserStore((state) => state.user)

    const comments = useCommentStore((state) => state.comments)
    const addComments = useCommentStore((state) => state.addComments)

    const [isCurrent, setIsCurrent] = useState(false)
    const [profile, setProfile] = useState<UserModel>()
    const [post, setPost] = useState<PostModel>()
    const [isCommentActive, setIsCommentActive] = useState(false)
    const [lIcon, setLIcon] = useState(likeIcon)
    
    useEffect(() => {
        if (loc.search === "?comment") {
            setIsCommentActive(true)
        }

        const getProfile = async () => {

            const currentPost = posts.find((p:PostModel) => p.id === Number(id))

            if (currentPost) {
                const data = await userService.getUser(currentPost.authorId)
                setProfile(data)
                setPost(currentPost)

                if (currentPost.id) {
                    getLikes(currentPost.id)
                }

                if ((currentPost.authorId === user?.id) || (user?.role === "ADMIN")) {
                    setIsCurrent(true)
                }

                if (currentPost?.id && user?.id) {
                    checkLiked(currentPost.id, user.id)
        
                    if (isLiked) {
                        setLIcon(activeLikeIcon)
                    } else {
                        setLIcon(likeIcon)
                    }
                }
            }
        }

        const getComments = async () => {
            const allComms = await commentService.getAllComments(Number(id))
            addComments(allComms)
        }

        getProfile()
        getComments()
    }, [])

    useEffect(() => {

        console.log(comments)

    }, [comments])

    const handleLike = () => {
        if (post?.id && user?.id) {
            toggleLike(post.id, user.id)
        }
    }

    const handleComment = () => {
        setIsCommentActive(!isCommentActive)
    }

    const handleDelete = async () => {
        if (post?.id) {
            const deletedPost = await postService.deletePost(post.id)
            console.log(deletedPost)

            if (deletedPost) {
                navigate('/blog')
            }
        }
    }

    const handleEdit = () => {
        navigate(`/blog/edit/${Number(id)}`)
    }

    const cIcon = isCommentActive ? activeCommIcon : commIcon

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <div className={style.headerUpper}>
                        <h1>{post?.title}</h1>
                        {isCurrent === false ? "" : (
                            <div className={style.headerButtonDiv}>
                                <button onClick={handleEdit}>
                                    Edit Post
                                </button>
                                <button onClick={handleDelete}>
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                    <Link to={`/profile/${profile?.id}`}>
                        @{profile?.username}
                    </Link>
                </div>
                <div className={style.postContent}>
                    <div className={style.location}>
                        <p>{post?.location} <img src={locationIcon} alt="location icon" /></p>
                        <p className={style.date}>{post?.date?.slice(0, 10)}</p>
                    </div>
                    <div className={style.postText}>
                        <pre>{post?.content}</pre>
                    </div>
                    <div className={style.contentFooter}>
                        <div className={style.footerDiv}>
                            <div className={style.likesDiv}>
                                <button className={style.footerBtn} onClick={handleLike}>
                                    <img src={lIcon} alt="like icon" />
                                </button>
                                <span>{likes.length}</span>
                            </div>
                            <div>
                                <button className={style.footerBtn} onClick={handleComment}>
                                    <img src={cIcon} alt="comment icon" />
                                </button>
                                <span>{comments.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isCommentActive === false ? "" :
                    <AddComment data={Number(id)}/>
                }
                {isCommentActive === false ? "" :
                    <div className={style.postComments}>
                        <h1>Comments</h1>
                        {comments.reverse().map((x) => (
                            <Comment data={x} key={x.id} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
