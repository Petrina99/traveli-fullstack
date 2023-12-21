import { useState } from "react";

import style from '@/views/styles/postSingle.module.css'
export const AddComment = () => {

    const [commValue, setCommValue] = useState("")

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommValue(e.target.value);

    }

    return (
        <div className={style.addComment}>
            <div className={style.addDiv}>
                <textarea 
                    name="comment" 
                    id="comment" 
                    cols={30} 
                    rows={2}
                    placeholder="Add comment"
                    autoFocus
                    onChange={handleTextarea}
                    value={commValue}
                ></textarea>
                <button 
                    disabled={!commValue}
                >
                    Add
                </button>
            </div>
        </div>
    )
}
