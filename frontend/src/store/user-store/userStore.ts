import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { UserModel } from '@/models'

import userService from "./userService";

export interface UserState {
    user: UserModel | null;
    logout: () => void;
    addUser: (userData: UserModel) => boolean;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                logout: async () => {
                    await userService.logoutUser()
                    set(() => ({ user: null }))
                },
                addUser: (userData) => {
                    if ((userData !== undefined) || (userData !== null)) {
                        set(() => ({ user: userData }))
                        return true
                    } else {
                        set(() => ({ user: null }))
                        return false
                    }
                },
            }),
            {
                name: "userStore"
            }
        )
    )
)
