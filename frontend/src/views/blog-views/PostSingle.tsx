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

import { useCommentStore, useLikeStore, useUserStore } from "@/store"
import { LikeModel, PostModel, UserModel } from "@/models"

import userService from "@/store/user-store/userService"
import postService from "@/store/post-store/postService"
import commentService from "@/store/comment-store/commentService"
import likeService from "@/store/like-store/likeService"

export const PostSingle = () => {

    const { id } = useParams()

    let loc = useLocation()
    const navigate = useNavigate()

    const user = useUserStore((state) => state.user)

    const comments = useCommentStore((state) => state.comments)
    const getComments = useCommentStore((state) => state.getComments)

    const likes = useLikeStore((state) => state.likes)
    const addLike = useLikeStore((state) => state.addLike)
    const deleteLike = useLikeStore((state) => state.deleteLike)

    const [currentLikes, setCurrentLikes] = useState<LikeModel[]>([])
    const [isLiked, setIsLiked] = useState(false)

    const [isCurrent, setIsCurrent] = useState(false)
    const [profile, setProfile] = useState<UserModel>()

    const [post, setPost] = useState<PostModel>()

    const [isCommentActive, setIsCommentActive] = useState(false)
    
    const handleLike = async () => {
        if (post?.id && user?.id) {
            const response = await likeService.toggleLike(user.id, post.id)
            const newLikes: LikeModel[] = await likeService.getAllLikes()

            const result = newLikes.filter((like) => (
                like.postId === post.id
            ))

            setCurrentLikes(result)

            if (response.message === "deleted") {
                deleteLike(response.like.id)
                setIsLiked(false)
            } else {
                addLike(response.like)
                setIsLiked(true)
            }
        }
    }

    useEffect(() => {
        if (loc.search === "?comment") {
            setIsCommentActive(true)
        }

        const fetchData = async () => {
            const currentPost = await postService.getOnePost(Number(id))
            const allComms = await commentService.getAllComments(Number(id))
            getComments(allComms)

            if (currentPost) {
                const userData = await userService.getUser(currentPost.authorId)
                setProfile(userData)
                setPost(currentPost)

                if ((currentPost.authorId === user?.id) || (user?.role === "ADMIN")) {
                    setIsCurrent(true)
                }

                if (currentPost.id) {
                    const fetchedLikes: LikeModel[] = likes.filter((like) => (
                        like.postId === currentPost.id
                    ))

                    setCurrentLikes(fetchedLikes)

                    const didLike = fetchedLikes.find((like) => (
                        like.userId === user?.id
                    ))

                    if (didLike === undefined) {
                        setIsLiked(false)
                    } else {
                        setIsLiked(true)
                    }
                }
            }
        }

        fetchData()
    }, [])

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
    const lIcon = isLiked ? activeLikeIcon : likeIcon
    
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
                                <span>{currentLikes.length}</span>
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
