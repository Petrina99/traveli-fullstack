import { create, StateCreator } from "zustand";

import { PostModel, UserModel, CommentModel } from '@/models'

interface PostSlice {
    posts: PostModel[];
    addPost: (post: PostModel) => void;
    deletePost: (id: string) => void;
}

interface UserSlice {
    user: UserModel | null;
    register: (curr: UserModel) => void;
    login: (curr: UserModel) => void;
    logout: () => void;
}

interface CommmentSlice {
    comments: CommentModel[];
    addComment: (comm: CommentModel) => void;
    deleteComment: (id: number) => void;
}

const createPostSlice: StateCreator<
    PostSlice
> = (set) => ({
    posts: [],
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => {
        return post.id !== id
    })}))
})

const createUserSlice: StateCreator<
    UserSlice
> = (set) => ({
    user: null,
    register: (curr) => set(() => ({ user: curr })),
    login: (curr) => set(() => ({ user: curr })),
    logout: () => set(() => ({ user: null }))
})

const createCommentSlice: StateCreator<
    CommmentSlice
> = (set) => ({
    comments: [],
    addComment: (comm) => set((state) => ({ comments: [...state.comments, comm] })),
    deleteComment: (id) => set((state) => ({ comments: state.comments.filter((comm) => {
        return comm.id !== id
    })}))
})

export const useBoundStore = create<PostSlice & UserSlice & CommmentSlice>()((...a) => ({
    ...createPostSlice(...a),
    ...createUserSlice(...a),
    ...createCommentSlice(...a)
}))