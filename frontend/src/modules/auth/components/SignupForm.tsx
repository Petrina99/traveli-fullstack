import { useForm } from 'react-hook-form'

import { useAuth } from './useAuth';

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

export const SignupForm = () => {

    const { fetchRegister } = useAuth()

    const navigate = useNavigate()

    //const addUser = useBoundStore((state) => state.addUser)
    const addUser = useUserStore((state) => state.addUser)
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


    const onSubmit = async (data: FormValues) => {
        
        const user = await fetchRegister(data)

        const isAdded = addUser(user)

        if (isAdded) {
            navigate("/blog")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <h1 className={style.formHeading}>Register</h1>
            <div className={style.formInputDiv}>
                <input 
                    className={style.input}
                    type="email" 
                    placeholder="Email" 
                    id="email-signup"
                    {...register('email', {
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
                        required: 'Password field is required.',
                    })} 
                />
                {errors.password && (
                    <p className={style.error}>{errors.password.message}</p>
                )}
            </div>
            <div className={style.formSubmit}>
                <button type='submit' className={style.submitBtn}>Create an account</button>
            </div>
        </form>
    )
}
