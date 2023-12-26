import { useParams } from "react-router-dom"

import { Header } from "@/modules"

import style from '../styles/errorSearchPage.module.css'

export const ErrorSearchPage = () => {

    const { type } = useParams()

    return (
        <div className={style.layout}>
            <Header />
            <div className={style.errorDiv}>
                <p>Error: {type} not found</p>
            </div>
        </div>
    )
}