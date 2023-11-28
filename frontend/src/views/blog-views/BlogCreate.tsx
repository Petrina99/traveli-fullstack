import { Header, CreatePost } from "@/modules"

import style from '../styles/blogCreate.module.css'

export const BlogCreate = () => {
  return (
    <div className={style.layout}>
        <Header />
        <CreatePost />
    </div>
  )
}
