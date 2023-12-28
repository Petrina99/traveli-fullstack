import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { LikeModel } from '@/models'


export interface LikeState {
    likes: LikeModel[];
    getLikes: (newLikes: LikeModel[]) => void;
    addLike: (like: LikeModel) => void;
    deleteLike: (id: number) => void;
    resetLike: () => void;
}

export const useLikeStore = create<LikeState>()(
    devtools(
        persist(
            (set) => ({
                likes: [],
                getLikes: (newLikes) => {
                    set(() => ({ likes: newLikes }))
                },
                addLike: (like) => {
                    set((state) => ({ likes: [...state.likes, like] }))
                },
                deleteLike: (id) => {
                    set((state) => ({ likes: state.likes.filter((like) => {
                        return like.id !== id
                    })}))
                },
                resetLike: () => {
                    set(() => ({ likes: []}))
                }
            }),
            {
                name: "likeStore"
            }
        )
    )
)