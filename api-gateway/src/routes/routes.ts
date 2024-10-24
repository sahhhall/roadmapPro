export const ROUTES = [
    {
        url: '/api/admin/assessment',
        auth: 'admin',
        proxy: {
            target: 'http://localhost:3002/api/admin/assessment',
            changeOrigin: true,
        }
    },

    {
        url: '/api/admin/roadmap',
        auth: "admin",
        proxy: {
            target: 'http://localhost:3001/api/admin/roadmap',
            changeOrigin: true,
        }
    },
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
            target: "http://localhost:3000/api/admin/users",
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/logout',
        auth: "admin",
        proxy: {
            target: "http://localhost:3000/api/admin/logout",
            changeOrigin: true,
        }
    },
    {
        url: '/api/admin/user-action',
        auth: "admin",
        proxy: {
            target: "http://localhost:3000/api/admin/user-action",
            changeOrigin: true
        }
    },
    {
        url: '/api/admin/',
        auth: false,
        proxy: {
            target: "http://localhost:3000/api/admin",
            changeOrigin: true,
        }
    },
    {
        url: '/api/roadmap/nodedetails',
        auth: false,
        proxy: {
            target: 'http://localhost:3001/api/roadmap/nodedetails',
            changeOrigin: true,
        }
    }
    ,
    , {
        url: '/api/roadmap/published',
        auth: false,
        proxy: {
            target: 'http://localhost:3001/api/roadmap/published',
            changeOrigin: true,
        }
    },
    {
        url: '/api/roadmap',
        auth: 'user',
        proxy: {
            target: 'http://localhost:3001/api/roadmap',
            changeOrigin: true,
        }
    },  {
        url: '/api/assessment',
        auth: 'user',
        proxy: {
            target: 'http://localhost:3002/api/assessment',
            changeOrigin: true,
        }
    }
];
