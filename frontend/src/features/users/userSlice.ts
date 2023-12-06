import { StateCreator } from "zustand";

import { UserModel } from '@/models'

import { logoutUser } from "./userService";

export interface UserSlice {
    user: UserModel | null;
    logout: () => void;
    addUser: (userData: UserModel) => boolean;
}

export const createUserSlice: StateCreator<
    UserSlice
> = (set) => ({
    user: null,
    logout: async () => {
       await logoutUser()
       set(({ user: null }))
    },
    addUser: (userData) => {
        set({ user: userData })

        return true;
    } 
})