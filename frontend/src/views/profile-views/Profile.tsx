import style from '../styles/profile.module.css'

import { Header, UserProfile } from '@/modules'

export const Profile = () => {
    return (
        <div className={style.layout}>
            <Header />
            <UserProfile />
        </div>
    )
}
