import { useParams } from 'react-router-dom'

import style from '../styles/userProfile.module.css'

import data from '@/const/posts'
import comments  from '@/const/comments'

import { Link } from 'react-router-dom'

export const UserProfile = () => {

    // simulacija backenda
    const info = {
        user: "user999",
        email: "user@email.com",
        id: 1,
        dateOfJoin: "22.1.2022."
    }

    console.log(data)

    const { user } = useParams()
    console.log(user)

    return (
        <div className={style.userContainer}>
            <div className={style.containerHeader}>
                <h1>Username: {info.user}</h1>
                <p>Email: {info.email}</p>
                <p>Date joined: {info.dateOfJoin}</p>
                <p>Number of posts: {data.length}</p>
                <p>Number of comments: {comments.length}</p>
            </div>
            <div className={style.posts}>
                <h1 className={style.postsHeading}>Posts by {info.user}</h1>
                {data.map((x) => (
                    <div key={x.id} className={style.postItem}>
                        <Link to={`/blog/${x.id}`}>
                            <h1>{x.title}</h1>
                        </Link>
                        <span>
                            {x.likes} likes
                        </span>
                        <span>
                            {x.comments} comments
                        </span>
                        <p>{x.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
