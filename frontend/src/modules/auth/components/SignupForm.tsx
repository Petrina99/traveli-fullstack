import { useForm } from 'react-hook-form'

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

type FormValues = {
    email: string;
    username: string;
    password: string;
}

const validation = {
    email:
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
};

import style from './styles/signupForm.module.css'
import { useUserStore } from '@/store';

import userService from '@/store/user-store/userService';

export const SignupForm = () => {

    const navigate = useNavigate()
    const addUser = useUserStore((state) => state.addUser)

    const [message, setMessage] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


    const onSubmit = async (data: FormValues) => {
        
        const userRegister = await userService.registerUser(data)

        console.log(userRegister)
        if (typeof userRegister === 'string') {
            let userError = userRegister.split(" ")
            if (userError[1] === 'email') {
                setMessage("User with that email already exists")
            }

            if (userError[1] === 'username') {
                setMessage("User with that username already exists")
            }

            if (userError[1] === 'create') {
                setMessage("Error creating a user")
            }
        } else {
            setMessage("")
            addUser(userRegister)
            navigate('/blog')
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(async (data: FormValues) => await onSubmit(data))} 
            className={style.form}
        >
            <h1 className={style.formHeading}>Register</h1>
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
                    type="text" 
                    placeholder="Username" 
                    id="username-signup"
                    {...register('username', {
                        onChange: () => { setMessage("")},
                        required: 'Username field is required.',
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
                <button type='submit' className={style.submitBtn}>Create an account</button>
            </div>
        </form>
    )
}
