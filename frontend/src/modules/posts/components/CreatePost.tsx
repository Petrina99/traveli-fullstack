import style from '../styles/createPost.module.css'
import { useForm } from 'react-hook-form'

import uniqid from 'uniqid'

//import { useBoundStore } from '@/store'

type FormValues = {
    title: string;
    location: string;
    content: string;
}

export const CreatePost = () => {

    //const posts = useBoundStore((state) => state.posts)
    //const addPost = useBoundStore((state) => state.addPost)

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    //console.log(posts)
    const onSubmit = (data: FormValues) => {
        const date = new Date().toDateString()
        const id = uniqid();

        const newPost = {
            id: id,
            title: data.title,
            date: date,
            location: data.location,
            content: data.content,
            user: "gaser",
            likes: 52,
            comments: 2
        }

        //addPost(newPost)
    }

    return (
        <div className={style.layout}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <h1 className={style.formHeading}>Create a new post</h1>
                <div className={style.inputDiv}>
                    <input 
                        type="text"
                        placeholder='Title'
                        id='title-create'
                        {...register('title', {
                            required: 'Title field is required.',
                        })} 
                    />
                    {errors.title && (
                        <p className={style.error}>{errors.title.message}</p>
                    )}
                </div>
                <div className={style.inputDiv}>
                    <input 
                        type="text"
                        placeholder='Location'
                        id='location-create'
                        {...register('location', {
                            required: 'Location field is required'
                        })}
                    />
                    {errors.location && (
                        <p className={style.error}>{errors.location.message}</p>
                    )}
                </div>
                <div className={style.inputDiv}>
                    <textarea 
                        id="content-create"
                        placeholder='Your story here'
                        cols={30} 
                        rows={5}
                        {...register('content', {
                            required: 'Post text field is required'
                        })}
                    ></textarea>
                    {errors.content && (
                        <p className={style.error}>{errors.content.message}</p>
                    )}
                </div>
                <div className={style.buttonDiv}>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}
