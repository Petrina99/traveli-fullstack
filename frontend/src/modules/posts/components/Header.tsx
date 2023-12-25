import style from '../styles/header.module.css'

import { Link, useNavigate } from 'react-router-dom'

import { useUserStore } from '@/store'

import { AutocompleteLocation, AutocompleteUsers } from '.'

export const Header = () => {

    const logoutUser = useUserStore((state) => state.logout)
    const user = useUserStore((state) => state.user)

    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()
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
