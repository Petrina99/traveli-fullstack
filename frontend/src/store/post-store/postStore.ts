import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { PostModel } from '@/models'

export interface PostState {
    posts: PostModel[];
    addPosts: (fetchedPosts: PostModel[]) => void;
    createPost: (post: PostModel) => void;
    deletePost: (id: number) => void;
    resetPosts: () => void;
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
                resetPosts: () => {
                    set(() => ({ posts: []}))
                }
            }),
            {
                name: "postStore"
            }
        )
    )
)