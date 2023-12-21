import { create } from "zustand";

import { 
    CommmentSlice,
    createCommentSlice
} from "@/features";

export const useBoundStore = create<CommmentSlice>()((...a) => ({
    ...createCommentSlice(...a)
}))