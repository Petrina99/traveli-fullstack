import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { PostModel } from '@/models'
import postService from "./postService"

export interface PostState {
    posts: PostModel[];
    getPosts: () => void;
}

export const usePostStore = create<PostState>()(
    devtools(
        persist(
            (set) => ({
                posts: [],
                getPosts: async () => {
                    const fetchedPosts = await postService.getPosts()
                    set(() => ({ posts: fetchedPosts }))
                },
            }),
            {
                name: "postStore"
            }
        )
    )
)