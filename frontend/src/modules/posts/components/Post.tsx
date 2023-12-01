import { useState } from 'react';

import { Link } from 'react-router-dom';
import style from '../styles/post.module.css'

interface propType {
    data : {
        id: string;
        title: string;
        date: string;
        location: string;
        content: string;
        user: string;
        likes: number;
        comments: number;
    }
}

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'

export const Post = ({data}: propType) => {

    const [isLikeActive, setIsLikeActive] = useState(false);

    const handleLike = () => {
        setIsLikeActive(!isLikeActive)
    }
    
    const icon = isLikeActive ? activeLikeIcon : likeIcon;

    return (
        <div className={style.layout}>
            <div className={style.header}>
                <div className={style.headerUpper}>
                    <h1>{data.title}</h1>
                </div>
               <p>@{data.user}</p>
            </div>
            <div className={style.content}>
                <div className={style.location}>
                    <p>{data.location} <img src={locationIcon} /></p>
                    <p className={style.date}>{data.date}</p>
                </div>
                <div className={style.text}>
                    <p>{data.content}</p>
                </div>
                <div className={style.buttonDiv}>
                    <Link to={`/blog/${data.id}`}>
                        <button>Expand article</button>
                    </Link>
                </div>
                <div className={style.contentFooter}>
                    <div className={style.footerDiv}>
                        <div className={style.likesDiv}>
                            <button onClick={handleLike} className={style.footerBtn}>
                                <img src={icon} alt="like icon" />
                            </button>
                            <span>{data.likes}</span>
                        </div>
                        <div className={style.commDiv}>
                            <Link to={`/blog/${data.id}?comment`}>
                                <button className={style.footerBtn}>
                                    <img src={commIcon} alt="comment icon" />
                                </button>
                            </Link>
                            <span>{data.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
