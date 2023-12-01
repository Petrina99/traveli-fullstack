import style from '../styles/profile.module.css'

import { Header, Footer, UserProfile } from '@/modules'

export const Profile = () => {
    return (
        <div className={style.layout}>
            <Header />
            <UserProfile />
            <Footer />
        </div>
    )
}
