import { SignupForm } from "@/modules"
import { Link } from "react-router-dom"

import style from '../styles/signup.module.css'

export const Signup = () => {
  return (
        <div>
            <Link to="/" className={style.link}>
                Traveli
            </Link>
            <div className={style.form}>
                <SignupForm />
            </div>
            <div className={style.linkLogin}>
                <span>Already have an account? </span>
                <Link to="/login">Login here</Link>
            </div>
        </div>
  )
}
