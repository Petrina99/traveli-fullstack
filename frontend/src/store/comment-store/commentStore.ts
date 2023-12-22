import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { CommentModel } from '@/models'

export interface CommentState {
    comments: CommentModel[];
    getComments: (id: number) => void;
    addComment: (comm: CommentModel) => void;
    deleteComment: (id: number) => void;
}

import commentService from "./commentService";

export const useCommentStore = create<CommentState>()(
    devtools(
        persist(
            (set) => ({
                comments: [],
                getComments: async (id) => {
                    const fetchedComments = await commentService.getAllComments(id)
                    set(() => ({ comments: fetchedComments }))
                },
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