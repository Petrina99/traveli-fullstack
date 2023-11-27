import { SignupForm } from "../../modules"
import { Link } from "react-router-dom"

import style from './signup.module.css'

export const Login = () => {
    return (
        <div>
            <Link to="/" className={style.link}>
                Traveli
            </Link>
            <div className={style.form}>
                <SignupForm type="Login" />
            </div>
            <div className={style.linkLogin}>
                <span>Don't have an account? </span>
                <Link to="/signup">Create one here</Link>
            </div>
        </div>
    )
}
