export const ROUTES = [
    {
        url: '/api/auth/',
        auth: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000, 
        //     max: 10
        // },
        proxy: {
            target: "http://localhost:3000",
            changeOrigin: true,
        }
    },
    
];
