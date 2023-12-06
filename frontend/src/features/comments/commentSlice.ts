import { StateCreator } from "zustand";

import { CommentModel } from '@/models'

export interface CommmentSlice {
    comments: CommentModel[];
    addComment: (comm: CommentModel) => void;
    deleteComment: (id: number) => void;
}

export const createCommentSlice: StateCreator<
    CommmentSlice
> = (set) => ({
    comments: [],
    addComment: (comm) => set((state) => ({ comments: [...state.comments, comm] })),
    deleteComment: (id) => set((state) => ({ comments: state.comments.filter((comm) => {
        return comm.id !== id
    })}))
})