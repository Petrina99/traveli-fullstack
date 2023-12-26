import style from '../styles/header.module.css'

import { Link, useNavigate } from 'react-router-dom'

import { useCommentStore, usePostStore, useUserStore } from '@/store'

import { AutocompleteLocation, AutocompleteUsers } from '.'

import userService from '@/store/user-store/userService'
export const Header = () => {

    const logoutUser = useUserStore((state) => state.logout)
    const resetPosts = usePostStore((state) => state.reset)
    const resetComments = useCommentStore((state) => state.reset)
    const user = useUserStore((state) => state.user)

    const navigate = useNavigate()

    const handleLogout = () => {
        userService.logoutUser()
        logoutUser()
        resetPosts()
        resetComments()
        navigate('/')
    }

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <Link to="/blog">
                    <h1>Traveli</h1>
                </Link>
            </div>
            <AutocompleteUsers />
            <AutocompleteLocation />
            <div className={style.user}>
                <Link to={`/profile/${user?.id}`}>
                    {user?.username}
                </Link>
                <Link to="/">
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </Link>
            </div>
        </header>
    )
}
