import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { CommentModel } from '@/models'

export interface CommentState {
    comments: CommentModel[];
    addComment: (comm: CommentModel) => void;
    deleteComment: (id: number) => void;
}

export const useCommentStore = create<CommentState>()(
    devtools(
        persist(
            (set) => ({
                comments: [],
                addComment: (comm) => {
                    set((state) => ({ comments: [...state.comments, comm] }))
                },
                deleteComment: (id) => {
                    set((state) => ({ comments: state.comments.filter((comm) => {
                        return comm.id !== id
                    })}))
                }
            }),
            {
                name: "commentStore"
            }
        )
    )
)