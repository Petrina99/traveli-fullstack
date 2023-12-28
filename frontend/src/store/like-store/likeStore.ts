import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { LikeModel } from '@/models'

export interface PostLike {
    id: number;
    likes: LikeModel[];
}

export interface LikeState {
    postLikes: PostLike[];
    addLike: (like: PostLike) => void;
    resetLike: () => void;
}

export const useLikeStore = create<LikeState>()(
    devtools(
        persist(
            (set) => ({
                postLikes: [],
                addLike: (like) => {
                    set((state) => ({ postLikes: [...state.postLikes, like] }))
                },
                resetLike: () => {
                    set(() => ({ postLikes: []}))
                }
            }),
            {
                name: "likeStore"
            }
        )
    )
)