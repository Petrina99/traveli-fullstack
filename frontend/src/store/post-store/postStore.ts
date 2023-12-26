import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { PostModel } from '@/models'
import postService from "./postService"

export interface PostState {
    posts: PostModel[];
    addPosts: (fetchedPosts: PostModel[]) => void;
    createPost: (post: PostModel) => void;
    deletePost: (id: number) => void;
    reset: () => void;
}

export const usePostStore = create<PostState>()(
    devtools(
        persist(
            (set) => ({
                posts: [],
                addPosts: (fetchedPosts) => {
                    set(() => ({ posts: fetchedPosts}))
                },
                createPost: (post) => {
                    set((state) => ({ posts: [...state.posts, post] }))
                },
                deletePost: (id) => {
                    set((state) => ({ posts: state.posts.filter((post) => {
                        return post.id !== id
                    })}))
                },
                reset: () => {
                    set(() => ({ posts: [] }))
                }
            }),
            {
                name: "postStore"
            }
        )
    )
)