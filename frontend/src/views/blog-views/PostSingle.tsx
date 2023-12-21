import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import { Header, Comment, AddComment } from "@/modules"

import style from '../styles/postSingle.module.css'

import comments from '@/const/comments'

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'
import activeCommIcon from '@/assets/comment-yellow.svg'

import { usePostStore } from "@/store"
import { PostModel, UserModel } from "@/models"
import userService from "@/store/user-store/userService"

export const PostSingle = () => {

    const { id } = useParams()
    let loc = useLocation()

    const posts = usePostStore((state) => state.posts)

    const [profile, setProfile] = useState<UserModel>()
    const [comms, setComms] = useState(comments)
    const [post, setPost] = useState<PostModel>()
    const[isLikeActive, setIsLikeActive] = useState(false)
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

        findPost()
        getProfile()
    })

    const lIcon = isLikeActive ? activeLikeIcon : likeIcon;
    const cIcon = isCommentActive ? activeCommIcon : commIcon;

    const handleLike = () => {
        setIsLikeActive(!isLikeActive)
    }

    const handleComment = () => {
        setIsCommentActive(!isCommentActive)
    }

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <div className={style.headerUpper}>
                        <h1>{post?.title}</h1>
                    </div>
                    <p>@{profile?.username}</p>
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
                                <span>{post?.likes}</span>
                            </div>
                            <div>
                                <button className={style.footerBtn} onClick={handleComment}>
                                    <img src={cIcon} alt="comment icon" />
                                </button>
                                <span>{post?.comments}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isCommentActive === false ? "" :
                    <div className={style.postComments}>
                        <h1>Comments</h1>
                        {comms.map((x) => (
                            <Comment data={x} key={x.id} />
                        ))}
                    </div>
                }
                {isCommentActive === false ? "" :
                    <AddComment />
                }
            </div>
        </div>
    )
}
