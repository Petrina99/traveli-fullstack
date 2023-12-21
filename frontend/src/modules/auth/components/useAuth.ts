import userService from '@/store/user-store/userService'
import { UserModel } from '@/models'

export const useAuth = () => {

    const fetchLogin = async(userData: UserModel) => {
        const userLogin = await userService.loginUser(userData)
        
        return userLogin.user
    }
    
    const fetchRegister = async (userData: UserModel) => {
        const userRegister = await userService.registerUser(userData)
        
        return userRegister.user
    }

    return {
        fetchLogin,
        fetchRegister
    }
}