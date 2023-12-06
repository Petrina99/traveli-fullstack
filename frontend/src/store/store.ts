import { create } from "zustand";

import { 
    PostSlice, 
    createPostSlice,
    UserSlice,
    createUserSlice,
    CommmentSlice,
    createCommentSlice
} from "@/features";

export const useBoundStore = create<PostSlice & UserSlice & CommmentSlice>()((...a) => ({
    ...createPostSlice(...a),
    ...createUserSlice(...a),
    ...createCommentSlice(...a)
}))