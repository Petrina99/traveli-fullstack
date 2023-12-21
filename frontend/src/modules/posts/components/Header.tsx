import style from '../styles/header.module.css'

import { Link, useNavigate } from 'react-router-dom'

import searchIcon from "@/assets/icon _search engine_.svg"

import { useUserStore } from '@/store'

export const Header = () => {

    const logoutUser = useUserStore((state) => state.logout)
    const user = useUserStore((state) => state.user)
    //const user = useBoundStore((state) => state.user)

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
            <div className={style.searchDiv}>
                <div className={style.inputDiv}>
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder='Search users' 
                        className={style.input}
                        autoFocus
                    />
                    <button>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </div>
            </div>
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
