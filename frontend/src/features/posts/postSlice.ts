import { StateCreator } from "zustand";

import { PostModel } from '@/models'

import postService from "./postService"

export interface PostSlice {
    posts: PostModel[];
    getPosts: () => void;
    addPost: (post: PostModel) => void;
    deletePost: (id: number) => void;
    getUserPosts: (id: number) => void;
    reset: () => void;
}

export const createPostSlice: StateCreator<
    PostSlice
> = (set) => ({
    posts: [],
    getPosts: async () => {
        const fetchedPosts = await postService.getPosts()
        set(() => ({ posts: fetchedPosts }))
    },
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => {
        return post.id !== id
    })})),
    getUserPosts: async (id) => {
        const userPosts = await postService.getUserPosts(id)
        set(() => ({ posts: userPosts }))
    },
    reset: () => set(() => ({ posts: [] }))
})