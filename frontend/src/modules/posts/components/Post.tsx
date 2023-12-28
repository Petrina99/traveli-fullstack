import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import style from '../styles/post.module.css'

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'

import { LikeModel, PostModel, UserModel } from '@/models';

import userService from '@/store/user-store/userService';

import { useLikeStore, useUserStore } from '@/store';

import commentService from '@/store/comment-store/commentService';
import likeService from '@/store/like-store/likeService';

interface propTypes {
    data: PostModel
}

export const Post = ({data} : propTypes) => {

    const [profile, setProfile] = useState<UserModel>()
    const [commentsCount, setCommentsCount] = useState(0)
    const [currentLikes, setCurrentLikes] = useState<LikeModel[]>([])
    const [isLiked, setIsLiked] = useState(false)

    //const { likes, getLikes, isLiked, checkLiked, toggleLike } = useLike()

    const user = useUserStore((state) => state.user)
    const addLike = useLikeStore((state) => state.addLike)
    const deleteLike = useLikeStore((state) => state.deleteLike)
    const likes = useLikeStore((state) => state.likes)

    const handleLike = async () => {
        if (data.id && user?.id) {
            const response = await likeService.toggleLike(user.id, data.id)
            const newLikes: LikeModel[] = await likeService.getAllLikes()

            const result = newLikes.filter((like) => (
                like.postId === data.id
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

        const fetchData = async () => {

            // getting user profile
            const userData = await userService.getUser(data.authorId)
            setProfile(userData)

            // getting commments
            if (data.id) {
                const comments = await commentService.getAllComments(data.id)
                setCommentsCount(comments.length)
            }

            // getting likes

            const result = likes.filter((like) => (
                like.postId === data.id
            ))
            
            setCurrentLikes(result)

            // checking if current user liked
            const didLike = result.find((res) => (
                res.userId === user?.id
            ))

            if (didLike === undefined) {
                setIsLiked(false)
            } else {
                setIsLiked(true)
            }
        }
    
        fetchData()
    }, [])
    
    const icon = isLiked ? activeLikeIcon : likeIcon;

    return (
        <div className={style.layout}>
            <div className={style.header}>
                <div className={style.headerUpper}>
                    <Link to={`/blog/${data.id}`}>
                        {data.title}
                    </Link>
                </div>
                <Link to={`/profile/${profile?.id}`}>
                    <p>@{profile?.username}</p>
                </Link>
            </div>
            <div className={style.content}>
                <div className={style.location}>
                    <Link to={`/blog/location/${data.location}`}>
                        {data.location} <img src={locationIcon} />
                    </Link>
                    <p className={style.date}>{data.date?.slice(0, 10)}</p>
                </div>
                <div className={style.text}>
                    {data.content.length > 400 && (
                        <pre>{data.content.substring(0, 400)}...</pre>
                    )}
                    {data.content.length < 400 && (
                        <pre>{data.content}</pre>
                    )}
                </div>
                <div className={style.contentFooter}>
                    <div className={style.footerDiv}>
                        <div className={style.likesDiv}>
                            <button onClick={handleLike} className={style.footerBtn}>
                                <img src={icon} alt="like icon" />
                            </button>
                            <span>{currentLikes.length}</span>
                        </div>
                        <div className={style.commDiv}>
                            <Link to={`/blog/${data.id}?comment`}>
                                <button className={style.footerBtn}>
                                    <img src={commIcon} alt="comment icon" />
                                </button>
                            </Link>
                            <span>{commentsCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
