import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import style from '../styles/post.module.css'

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'

import { PostModel, UserModel } from '@/models';

import userService from '@/store/user-store/userService';

import { useUserStore } from '@/store';

import { useLike } from './hooks';
import commentService from '@/store/comment-store/commentService';

interface propTypes {
    data: PostModel
}

export const Post = ({data} : propTypes) => {

    const [profile, setProfile] = useState<UserModel>()
    const [commentsCount, setCommentsCount] = useState(0)

    const { likes, getLikes, isLiked, checkLiked, toggleLike } = useLike()

    const user = useUserStore((state) => state.user)

    const handleLike = async () => {
        if (data.id && user?.id) {
            toggleLike(data.id, user.id)
        }
    }
    
    useEffect(() => {
        const getProfile = async () => {

            const userData = await userService.getUser(data.authorId)
            setProfile(userData)
        }

        const getComments = async () => {
            if (data.id) {
                const comments = await commentService.getAllComments(data.id)
                setCommentsCount(comments.length)
            }
        }

        getProfile()
        getComments()

        if (data.id) {
            getLikes(data.id)
        }

        if (data.id && user?.id) {
            checkLiked(data.id, user.id)
        }
        
    }, [likes])
    
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
                            <span>{likes.length}</span>
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
