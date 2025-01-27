import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;
const BASE_URL = baseURL ;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    response => response,
    async function (error) {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log("machu am here on intercpetre")
                await axiosInstance.post('/api/auth/refreshToken');
                return axiosInstance(originalRequest);
            } catch (err) {
                console.log(err, "from interptor")
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
