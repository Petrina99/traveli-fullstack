import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { UserModel } from '@/models'

export interface UserState {
    user: UserModel | null;
    logout: () => void;
    addUser: (userData: UserModel) => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                logout: () => {
                    set(() => ({ user: null }))
                },
                addUser: (userData) => {
                    set(() => ({ user: userData }))
                },
            }),
            {
                name: "userStore"
            }
        )
    )
)
