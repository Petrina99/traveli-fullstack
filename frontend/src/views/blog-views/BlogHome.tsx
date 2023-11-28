import { Header, Buttons } from "@/modules"

import style from '../styles/blogHome.module.css'

export const BlogHome = () => {
    return (
        <div className={style.layout}>
            <Header />
            <Buttons />
        </div>
    )
}
