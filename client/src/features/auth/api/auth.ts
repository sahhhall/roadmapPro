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

export const verifyOtp = async (email: string) => {
    try {
        const response = await axiosInstance.post(userRoutes.resendOtp, { email: email });
        return response.data
    }
    catch (error: any) {
        return error.response.data;
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(userRoutes.logout);
        console.log(response,"response from api")
        return response
    }
    catch (error: any) {
        return error.response.data;
    }
}