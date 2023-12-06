import { Header, Post, Footer } from "@/modules"

import style from '../styles/blogHome.module.css'

import { useBoundStore } from "@/store"

export const BlogHome = () => {

    const posts = useBoundStore((state) => state.posts)
    const data = useBoundStore((state) => state.user)

    console.log(data)
    return (
        <div className={style.layout}>
            <Header />
            {posts.map((x) => (
                <Post data={x} key={x.id}/>
            ))}
            <Footer />
        </div>
    )
}
