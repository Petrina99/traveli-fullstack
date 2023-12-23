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

export const PostSingle = () => {

    const { id } = useParams()
    let loc = useLocation()
    const navigate = useNavigate()
    
    const { likes, getLikes, isLiked, checkLiked, toggleLike } = useLike()

    const posts = usePostStore((state) => state.posts)

    const user = useUserStore((state) => state.user)

    const comments = useCommentStore((state) => state.comments)
    const getAllComments = useCommentStore((state) => state.getComments)

    const [isCurrent, setIsCurrent] = useState(false)
    const [profile, setProfile] = useState<UserModel>()
    const [post, setPost] = useState<PostModel>()
    const [isCommentActive, setIsCommentActive] = useState(false)

    const findPost = () => {
        let foundPost;

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === Number(id)) {
                foundPost = posts[i]
                break;
            }
        }

        setPost(foundPost)
    }

    useEffect(() => {
        if (loc.search === "?comment") {
            setIsCommentActive(true)
        }

        const getProfile = async () => {

            const currentPost = posts.find((p:PostModel) => p.id === Number(id))

            if (currentPost) {
                const data = await userService.getUser(currentPost.authorId)
                setProfile(data)
            }
        }

        const getComments = async () => {
            await getAllComments(Number(id))
        }

        if ((profile?.id === user?.id) || (user?.role === "ADMIN")) {
            setIsCurrent(true)
        }

        if (post?.id) {
            getLikes(post.id)
        }

        if (post?.id && user?.id) {
            checkLiked(post.id, user.id)
        }

        getComments()
        findPost()
        getProfile()
    }, [comments, likes])

    const lIcon = isLiked ? activeLikeIcon : likeIcon;
    const cIcon = isCommentActive ? activeCommIcon : commIcon;

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

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <div className={style.headerUpper}>
                        <h1>{post?.title}</h1>
                        {isCurrent === false ? "" : (
                            <button onClick={handleDelete}>
                                Delete Post
                            </button>
                        )}
                    </div>
                    <Link to={`/profile/${profile?.id}`}>
                        <p>@{profile?.username}</p>
                    </Link>
                </div>
                <div className={style.postContent}>
                    <div className={style.location}>
                        <p>{post?.location} <img src={locationIcon} alt="location icon" /></p>
                        <p className={style.date}>{post?.date}</p>
                    </div>
                    <div className={style.postText}>
                        <p>{post?.content}</p>
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
                                <span>{/*{post.comments} */}5</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isCommentActive === false ? "" :
                    <div className={style.postComments}>
                        <h1>Comments</h1>
                        {comments.map((x) => (
                            <Comment data={x} key={x.id} />
                        ))}
                    </div>
                }
                {isCommentActive === false ? "" :
                    <AddComment data={Number(id)}/>
                }
            </div>
        </div>
    )
}
