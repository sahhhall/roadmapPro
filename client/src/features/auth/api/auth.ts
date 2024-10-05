import axiosInstance from '@/services/axiosConfig';
import { userRoutes } from '@/features/auth/services/endpoints';



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