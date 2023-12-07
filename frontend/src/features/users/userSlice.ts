import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { UserModel } from '@/models'

import { logoutUser } from "./userService";

export interface UserSlice {
    user: UserModel | null;
    logout: () => void;
    addUser: (userData: UserModel) => boolean;
}

export const createUserSlice: StateCreator<
    UserSlice,
    [], [["zustand/persist", unknown]]
> = persist((set) => ({
    user: null,
    logout: async () => {
       await logoutUser()
       set(({ user: null }))
    },
    addUser: (userData) => {
        if (userData !== undefined) {
            set({ user: userData })
            return true;
        } else {
            return false;
        }
    } 
}), {
    name: 'user-storage'
})