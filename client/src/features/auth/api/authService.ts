import axiosInstance from '@/services/axiosConfig';
import { SignupData } from '../types/auth';
import { userRoutes } from '../services/endpoints';




export const userSignup = async (data: SignupData) => {
    try {
        const response = await axiosInstance.post(userRoutes.signup, data);
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
}