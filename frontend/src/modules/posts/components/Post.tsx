import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import style from '../styles/post.module.css'

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'

import { PostModel, UserModel } from '@/models';
import userService from '@/store/user-store/userService';

interface propTypes {
    data: PostModel
}

export const Post = ({data} : propTypes) => {

    const [isLikeActive, setIsLikeActive] = useState(false);

    const [profile, setProfile] = useState<UserModel>()

    const handleLike = () => {
        setIsLikeActive(!isLikeActive)
    }
    
    useEffect(() => {
        const getProfile = async () => {

            const userData = await userService.getUser(data.authorId)
            setProfile(userData)
        }

        getProfile()
    }, [])
    
    const icon = isLikeActive ? activeLikeIcon : likeIcon;

    return (
        <div className={style.layout}>
            <div className={style.header}>
                <div className={style.headerUpper}>
                    <h1>{data.title}</h1>
                </div>
                <Link to={`/profile/${profile?.id}`}>
                    <p>@{profile?.username}</p>
                </Link>
            </div>
            <div className={style.content}>
                <div className={style.location}>
                    <p>{data.location} <img src={locationIcon} /></p>
                    <p className={style.date}>{data.date?.slice(0, 10)}</p>
                </div>
                <div className={style.text}>
                    <p>{data.content}</p>
                </div>
                <div className={style.contentFooter}>
                    <div className={style.footerDiv}>
                        <div className={style.likesDiv}>
                            <button onClick={handleLike} className={style.footerBtn}>
                                <img src={icon} alt="like icon" />
                            </button>
                            <span>{/*{data.likes} */}5</span>
                        </div>
                        <div className={style.commDiv}>
                            <Link to={`/blog/${data.id}?comment`}>
                                <button className={style.footerBtn}>
                                    <img src={commIcon} alt="comment icon" />
                                </button>
                            </Link>
                            <span>{/*{data.comments} */}5</span>
                        </div>
                    </div>
                    <div className={style.buttonDiv}>
                        <Link to={`/blog/${data.id}`}>
                            <button>Expand article</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
