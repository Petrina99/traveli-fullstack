import { useParams } from "react-router-dom"
import { useState } from "react"

import { Header, Comment, Footer } from "@/modules"

import style from '../styles/postSingle.module.css'

const data = [{
    id: 0,
    title: "Trip to New York",
    date: "22.12.2024.",
    location: "New York, USA",
    content: "New York City, the city that never sleeps, truly lives up to its reputation as an unparalleled metropolis that dazzles and captivates at every turn. My recent three-day escapade in the Big Apple was an adventure of a lifetime, filled with unexpected twists and unforgettable moments. From the moment I set foot in Times Square, I was immediately immersed in the vibrant energy that defines this iconic city. The towering skyscrapers adorned with mesmerizing billboards created a kaleidoscope of lights, and the hustle and bustle of the crowd added an electrifying atmosphere. It was a sensory overload, and I loved every moment of it. Each day brought new discoveries, and despite my initial plan to stick to the typical tourist spots, I found myself on unexpected detours that turned out to be the highlights of my trip. Staten Island, a detour suggested by a friendly local, revealed charming streets and a taste of authentic New York life that I would have missed otherwise. The Statue of Liberty, though seen from a distance, became a symbol of the unexpected twists that made my journey unique. The ferry ride to Staten Island provided not only breathtaking views of the skyline but also a chance to connect with the warmth of the local community. Central Park, a sprawling oasis in the heart of the city, was the backdrop for my final day—a day filled with a magical mistake. A horse-drawn carriage ride led me to a hidden garden, a secret haven of beauty that felt like a fairy tale come to life. It was a reminder that sometimes, the best experiences come from embracing the unknown. The diversity of New York City is reflected not only in its people but also in its cuisine. From savoring a classic New York hot dog in Times Square to indulging in local treats in Staten Island, my taste buds went on a journey of their own.",
    user: "user2323",
    likes: 1400,
    comments: 220
}, {
    id: 1,
    title: "Trip to Chi",
    date: "22.12.2024.",
    location: "New York, USA",
    content: "New York City, the city that never sleeps, truly lives up to its reputation as an unparalleled metropolis that dazzles and captivates at every turn. My recent three-day escapade in the Big Apple was an adventure of a lifetime, filled with unexpected twists and unforgettable moments. From the moment I set foot in Times Square, I was immediately immersed in the vibrant energy that defines this iconic city. The towering skyscrapers adorned with mesmerizing billboards created a kaleidoscope of lights, and the hustle and bustle of the crowd added an electrifying atmosphere. It was a sensory overload, and I loved every moment of it. Each day brought new discoveries, and despite my initial plan to stick to the typical tourist spots, I found myself on unexpected detours that turned out to be the highlights of my trip. Staten Island, a detour suggested by a friendly local, revealed charming streets and a taste of authentic New York life that I would have missed otherwise. The Statue of Liberty, though seen from a distance, became a symbol of the unexpected twists that made my journey unique. The ferry ride to Staten Island provided not only breathtaking views of the skyline but also a chance to connect with the warmth of the local community. Central Park, a sprawling oasis in the heart of the city, was the backdrop for my final day—a day filled with a magical mistake. A horse-drawn carriage ride led me to a hidden garden, a secret haven of beauty that felt like a fairy tale come to life. It was a reminder that sometimes, the best experiences come from embracing the unknown. The diversity of New York City is reflected not only in its people but also in its cuisine. From savoring a classic New York hot dog in Times Square to indulging in local treats in Staten Island, my taste buds went on a journey of their own.",
    user: "user2323",
    likes: 1560,
    comments: 450
}]

let comments = [{
    id: 0,
    text: "Really like the review",
    user: "user999"
}, { 
    id: 1,
    text: "Good review",
    user: "user911"
}, {
    id: 2,
    text: "Plan to go there next week, nice review",
    user: "user11"
}]

import locationIcon from '@/assets/icon _Alternate Map Marker_.svg'

import likeIcon from '@/assets/heart-svgrepo-com.svg'
import activeLikeIcon from '@/assets/heart-svgrepo-com-yellow.svg'

import commIcon from '@/assets/comment-5-svgrepo-com.svg'
import activeCommIcon from '@/assets/comment-yellow.svg'

export const PostSingle = () => {

    const [comms, setComms] = useState(comments)

    console.log(comms)

    const[isLikeActive, setIsLikeActive] = useState(false)
    const [isCommentActive, setIsCommentActive] = useState(true)
    const [commValue, setCommValue] = useState("")

    const { id } = useParams()

    const post = data[id ? parseInt(id): 0]

    const lIcon = isLikeActive ? activeLikeIcon : likeIcon;
    const cIcon = isCommentActive ? activeCommIcon : commIcon;

    const handleLike = () => {
        setIsLikeActive(!isLikeActive)
    }

    const handleComment = () => {
        setIsCommentActive(!isCommentActive)
    }

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommValue(e.target.value);

    }

    const handleAdd = () => {
        setComms(current => [...current, {
            id: 55,
            text: commValue,
            user: "gaser"
        }])
        console.log(comms)
    }

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <div className={style.headerUpper}>
                        <h1>{post.title}</h1>
                    </div>
                    <p>@{post.user}</p>
                </div>
                <div className={style.postContent}>
                    <div className={style.location}>
                        <p>{post.location} <img src={locationIcon} alt="location icon" /></p>
                        <p className={style.date}>{post.date}</p>
                    </div>
                    <div className={style.postText}>
                        <p>{post.content}</p>
                    </div>
                    <div className={style.contentFooter}>
                        <div className={style.footerDiv}>
                            <div className={style.likesDiv}>
                                <button className={style.footerBtn} onClick={handleLike}>
                                    <img src={lIcon} alt="like icon" />
                                </button>
                                <span>{post.likes}</span>
                            </div>
                            <div>
                                <button className={style.footerBtn} onClick={handleComment}>
                                    <img src={cIcon} alt="comment icon" />
                                </button>
                                <span>{post.comments}</span>
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
                    <div className={style.addComment}>
                        <div className={style.addDiv}>
                            <textarea 
                                name="comment" 
                                id="comment" 
                                cols={30} 
                                rows={2}
                                placeholder="Add comment"
                                autoFocus
                                onChange={handleTextarea}
                                value={commValue}
                            ></textarea>
                            <button 
                                disabled={!commValue}
                                onClick={handleAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
