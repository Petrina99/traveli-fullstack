import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

type FormValues = {
    email: string;
    password: string;
}

import { useState } from 'react';

const validation = {
    email:
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
};

import style from './styles/signupForm.module.css'

import { useUserStore } from '@/store';

import userService from '@/store/user-store/userService';

export const LoginForm = () => {

    const addUser = useUserStore((state) => state.addUser)
    const navigate = useNavigate()

    const [message, setMessage] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        
        const userLogin = await userService.loginUser(data)

        if (userLogin === "error") {
            setMessage("User with those credentials doesn't exist")
        } else {
            setMessage("")
            addUser(userLogin)
            navigate('/blog')
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(async (data: FormValues) => await onSubmit(data))} 
            className={style.form}
        >
            <h1 className={style.formHeading}>Login</h1>
            <div className={style.formInputDiv}>
                <input 
                    className={style.input}
                    type="email" 
                    placeholder="Email" 
                    id="email-signup"
                    {...register('email', {
                        onChange: () => { setMessage("")},
                        required: 'Email field is required.',
                        pattern: {
                            value: validation.email,
                            message: 'Please enter a valid email.'
                        }
                    })} 
                />
                {errors.email && (
                    <p className={style.error}>{errors.email.message}</p>
                )}
            </div>
            <div className={style.formInputDiv}>
                <input 
                    className={style.input}
                    type="password" 
                    placeholder="Password" 
                    id="password-signup"
                    {...register('password', {
                        onChange: () => { setMessage("")},
                        required: 'Password field is required.',
                    })} 
                />
                {errors.password && (
                    <p className={style.error}>{errors.password.message}</p>
                )}
            </div>
            {message && (
                <div className={style.errorDiv}>
                    <p className={style.error}>{message}</p>
                </div>
            )}
            <div className={style.formSubmit}>
                <input 
                    type='submit' 
                    className={style.submitBtn}
                />
            </div>
        </form>
    )
}
