import { useParams } from 'react-router-dom'

import style from '../styles/userProfile.module.css'

import { useEffect, useState } from 'react'

import { PostDetails } from '.'

import { usePostStore, useUserStore } from '@/store'
import { PostModel, UserModel } from '@/models'
import userService from '@/store/user-store/userService'

import postService from '@/store/post-store/postService'
import { Link } from 'react-router-dom'

export const UserProfile = () => {

    const { id } = useParams()

    const [profile, setProfile] = useState<UserModel>()

    const [filteredPosts, setFilteredPosts] = useState<PostModel[]>()
    const [isCurrent, setIsCurrent] = useState(false)

    const user = useUserStore((state) => state.user)
    const posts = usePostStore((state) => state.posts)
    const deletePost = usePostStore((state) => state.deletePost)

    const filterPosts = () => {
        let fillPosts = [];

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].authorId === Number(id)) {
                fillPosts.push(posts[i])
            }
        }

        setFilteredPosts(fillPosts.reverse())
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = e.currentTarget;

        const response = await postService.deletePost(Number(value))
        deletePost(response)
        
        let fillPosts = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id !== response.id && posts[i].authorId === Number(id)) {
                fillPosts.push(posts[i])
            }
        }
        
        setFilteredPosts(fillPosts.reverse())
    }

    useEffect(() => {
        const getProfile = async () => {
            const data = await userService.getUser(Number(id))

            setProfile(data)
        }
    
        getProfile()    
        filterPosts()
    }, [])

    useEffect(() => {
        if ((profile?.id === user?.id) || (user?.role === "ADMIN")) {
            setIsCurrent(true)
        }
    }, [profile])

    return (
        <div className={style.userContainer}>
            <div className={style.containerHeader}>
                <h1>Username: {profile?.username}</h1>
                <p>Email: {profile?.email}</p>
                {user?.role === "ADMIN" ? (
                    <Link to='/admin'>
                        <button>
                            Open dashboard
                        </button>
                    </Link>
                ) : ""}
            </div>
            <div className={style.posts}>
                <h1 className={style.postsHeading}>Posts by {profile?.username}</h1>
                {filteredPosts?.map((x) => (
                    <PostDetails
                        key={x.id}
                        data={x} 
                        isCurrent={isCurrent} 
                        handleDelete={handleDelete}
                    />
                ))}
                {filteredPosts?.length ? "" : (
                    <div className={style.postItem}>
                        <p>This user doesn't have any posts</p>
                    </div>
                )}
            </div>
        </div>
    )
}
