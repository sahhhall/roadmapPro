export const ROUTES = [
    {
        url: '/api/auth/',
        auth: false,
        proxy: {
            target: "http://localhost:3000/api/auth",
            changeOrigin: true,
        }
    },
    {
        url: '/api/auth/logout',
        auth: "user",
        proxy: {
            target: "http://localhost:3000/api/auth",
            changeOrigin: true,
        }

    },
    {
        url: '/api/admin/users',
        auth: "admin",
        proxy: {
            target: "http://localhost:3000/api/admin",
            changeOrigin: true,
        }
    },
   
    
];
