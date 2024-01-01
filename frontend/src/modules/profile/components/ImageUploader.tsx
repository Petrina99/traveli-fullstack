import { UserModel } from "@/models";

import { useState } from "react";

import axios from 'axios'
import userService from "@/store/user-store/userService";

import style from '../styles/imageUploader.module.css'

interface propTypes {
    isCurrent: boolean,
    profile: UserModel | undefined,
    setProfile: React.Dispatch<React.SetStateAction<UserModel | undefined>>
}

export const ImageUploader: React.FC<propTypes> = (props) => {

    const { isCurrent, profile, setProfile } = props;

    const [selectedImage, setSelectedImage] = useState<File | null>()
    const [message, setMessage] = useState("")

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file  = e.currentTarget.files[0]
            if (file.type !== "image/jpeg" || file.size > 3500000) {
                setMessage("File has to be smaller than 3.5 MB and in JPEG format")
            } else {
                setMessage("")
                setSelectedImage(file)
            }
            
        }
    }

    const handleImageUpload = async () => {
        if (!selectedImage) {
            alert('Please select an image')
            return;
        }

        try {
            const formData = new FormData()
            formData.append('image', selectedImage)

            const response = await axios.patch('http://localhost:8000/api/users/' + profile?.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            if (profile?.id) {
                const updatedUser = await userService.getUser(profile?.id)

                setProfile(updatedUser)
            }

            setSelectedImage(null)
            console.log('Image: ', response.data)
        } catch (error) {
            console.log("error frontend")
        }
    } 

    return (
        <div className={style.imageUploader}>
            {profile?.imageUrl && (
                <div className={style.imageContainer}>
                    <img 
                        src={profile?.imageUrl} 
                        alt="profile image" 
                        className={style.image}
                    />
                </div>
            )}
            {isCurrent ? (
                <div className={style.inputDiv}>
                    <label 
                        htmlFor="image" 
                        className={style.inputLabel}
                    >
                        {selectedImage ? selectedImage.name : "Change your profile picture"}
                    </label>
                    <input className={style.fileInput} type="file" id="image" onChange={handleImageChange} />
                    {selectedImage && (
                        <button 
                            type='button'
                            onClick={handleImageUpload}
                            className={style.uploadButton}
                        >
                            Upload
                        </button>
                    )}
                    {message && (
                        <p>{message}</p>
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    )
}