import style from './styles/homepage.module.css'
import { Link, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import { usePostStore, useUserStore } from '@/store'

export const Homepage = () => {

    const user = useUserStore((state) => state.user)
    const posts = usePostStore((state) => state.posts)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(posts)
        if (user) {
            navigate('/blog')
        }
    }, [])

    return (
            <div className={style.layout}>
                <section className={style.logoSection}>
                    <div className={style.logoDiv}>
                        <h1 className={style.logoName}>
                                Traveli
                        </h1>
                        <p className={style.logoPar}>Share your travel experience</p>
                    </div>
                </section>
                <section className={style.buttonSection}>
                    <div className={style.authContainer}>
                        <div className={style.authDiv}>
                            <p className={style.authHeading}>Create new account</p>
                            <Link to="/signup">
                                <button className={style.authButton}>Sign Up</button>
                            </Link>
                        </div>
                        <div className={style.authDiv}>
                            <p className={style.authHeading}>Already have an account?</p>
                            <Link to="/login">
                                <button className={style.authButton}>Login</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
}
  