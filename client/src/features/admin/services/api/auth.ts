import axiosInstance from '@/services/axiosConfig';
import { adminEndpoints } from '@/features/admin/services/endpoints';
import { LoginCredentials } from '@/features/admin/types/admin';





export const adminLogin = async (data: LoginCredentials) => {
    try {
        const response = await axiosInstance.post(adminEndpoints.login, data);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error: any) {
        console.error('Admin login error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.errors || [{ message: 'An unexpected error occurred' }]
        };
    }
};


