import { loginUser, registerUser } from '@/features/users/userService'
import { UserModel } from '@/models'

export const useAuth = () => {

    const fetchLogin = async(userData: UserModel) => {
        const userLogin = await loginUser(userData)
        
        return userLogin.user
    }
    
    const fetchRegister = async (userData: UserModel) => {
        const userRegister = await registerUser(userData)
        
        return userRegister.user
    }

    return {
        fetchLogin,
        fetchRegister
    }
}