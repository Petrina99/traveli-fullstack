import { StateCreator } from "zustand";

import { PostModel } from '@/models'

import postService from "./postService"

export interface PostSlice {
    posts: PostModel[];
    /*getPosts: () => void;*/
    addPost: (post: PostModel) => void;
    deletePost: (id: number) => void;
    reset: () => void;
}

const initalState = await postService.getPosts()

export const createPostSlice: StateCreator<
    PostSlice
> = (set) => ({
    posts: initalState,
    /*getPosts: async () => {
        const fetchedPosts = await postService.getPosts()
        set(() => ({ posts: fetchedPosts }))
    }*/
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => {
        return post.id !== id
    })})),
    reset: () => set(() => ({ posts: [] }))
})