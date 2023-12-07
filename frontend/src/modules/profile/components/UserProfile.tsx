import { useParams } from 'react-router-dom'

import style from '../styles/userProfile.module.css'

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useBoundStore } from '@/store'
import { PostModel, UserModel } from '@/models'
import { getUser } from '@/features/users/userService'

import postService from '@/features/posts/postService'
export const UserProfile = () => {

    const { id } = useParams()

    const [profile, setProfile] = useState<UserModel>()

    console.log(id)
    const [filteredPosts, setFilteredPosts] = useState<PostModel[]>()
    const user = useBoundStore((state) => state.user)
    const posts = useBoundStore((state) => state.posts)
    const deletePost = useBoundStore((state) => state.deletePost)

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

        await deletePost(response.id)

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
            const data = await getUser(Number(id))

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
                        <span>
                            {x.likes} likes
                        </span>
                        <span>
                            {x.comments} comments
                        </span>
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
