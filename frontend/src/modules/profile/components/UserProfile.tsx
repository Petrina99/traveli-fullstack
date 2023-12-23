import { useParams } from 'react-router-dom'

import style from '../styles/userProfile.module.css'

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { usePostStore, useUserStore } from '@/store'
import { PostModel, UserModel } from '@/models'
import userService from '@/store/user-store/userService'

import postService from '@/store/post-store/postService'
import likeService from '@/store/like-store/likeService'

export const UserProfile = () => {

    const { id } = useParams()

    const [profile, setProfile] = useState<UserModel>()

    const [filteredPosts, setFilteredPosts] = useState<PostModel[]>()

    const user = useUserStore((state) => state.user)
    const posts = usePostStore((state) => state.posts)

    const filterPosts = () => {
        let fillPosts = [];

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].authorId === Number(id)) {
                fillPosts.push(posts[i])
            }
        }

        setFilteredPosts(fillPosts)
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget;

        const response = await postService.deletePost(Number(value))

        let fillPosts = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id !== response.id && posts[i].authorId === Number(id)) {
                fillPosts.push(posts[i])
            }
        }

        setFilteredPosts(fillPosts)
        console.log(response)
    }

    useEffect(() => {
        const getProfile = async () => {
            const data = await userService.getUser(Number(id))

            setProfile(data)
        }

        getProfile()
        filterPosts()
    }, [])

    return (
        <div className={style.userContainer}>
            <div className={style.containerHeader}>
                <h1>Username: {profile?.username}</h1>
                <p>Email: {profile?.email}</p>
            </div>
            <div className={style.posts}>
                <h1 className={style.postsHeading}>Posts by {user?.username}</h1>
                {filteredPosts?.map((x) => (
                    <div key={x.id} className={style.postItem}>
                        <Link to={`/blog/${x.id}`}>
                            <h1>{x.title}</h1>
                        </Link>
                        <p>{x.date?.slice(0, 10)}</p>
                        <button 
                            onClick={handleDelete}
                            value={x.id}
                        ><strong>Delete post</strong></button>
                    </div>
                ))}
            </div>
        </div>
    )
}
