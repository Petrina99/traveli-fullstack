import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom';

type FormValues = {
    email: string;
    password: string;
}

const validation = {
    email:
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
};

import style from './styles/signupForm.module.css'

export const LoginForm = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues ) => {
        console.log(data)

        navigate("/blog")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <h1 className={style.formHeading}>Login</h1>
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
