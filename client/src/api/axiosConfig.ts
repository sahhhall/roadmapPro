import axios from 'axios'

const BASE_URL = process.env.BASE_URL || 'http://localhost:4001';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

axios.interceptors.response.use()



export default axiosInstance