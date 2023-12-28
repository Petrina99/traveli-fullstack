import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { CommentModel } from '@/models'

export interface CommentState {
    comments: CommentModel[];
    getComments: (comms: CommentModel[]) => void;
    addComment: (comm: CommentModel) => void;
    deleteComment: (id: number) => void;
    resetComments: () => void;
}

export const useCommentStore = create<CommentState>()(
    devtools(
        persist(
            (set) => ({
                comments: [],
                getComments: (comms) => {
                    set(() => ({ comments: comms }))
                },
                addComment: (comm) => {
                    set((state) => ({ comments: [...state.comments, comm] }))
                },
                deleteComment: (id) => {
                    set((state) => ({ comments: state.comments.filter((comm) => {
                        return comm.id !== id
                    })}))
                },
                resetComments: () => {
                    set(() => ({ comments: []}))
                }
            }),
            {
                name: "commentStore"
            }
        )
    )
)